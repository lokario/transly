import { IDBPDatabase } from "idb";
import { useEffect, useState } from "react";
import { openDatabase } from "../../lib/chatbotDB";

interface ChatSession {
	id: number;
	name: string;
}

export const useChatSessions = () => {
	const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
	const [activeSessionId, setActiveSessionId] = useState<number>(0);
	const [chatSessionsLoading, setLoading] = useState(true);

	const initializeChats = async () => {
		try {
			const db = await openDatabase();
			const tx = db.transaction("chatSessions", "readonly");
			const store = tx.objectStore("chatSessions");
			const sessions = await store.getAll();

			if (!sessions.length) await addChatSession(db);
			else {
				setChatSessions(sessions.reverse());
				setActiveSessionId(sessions[0].id);
			}
		} catch (error) {
			console.error("Error initializing chat sessions:", error);
		} finally {
			setLoading(false);
		}
	};

	const newChatSession = async () => {
		try {
			const db = await openDatabase();
			addChatSession(db);
		} catch (error) {
			console.error("Error adding chat session:", error);
		}
	};

	const renameChatSession = async (sessionId: number, newName: string) => {
		try {
			const db = await openDatabase();
			const tx = db.transaction("chatSessions", "readwrite");
			const store = tx.objectStore("chatSessions");
			const session = await store.get(sessionId);

			if (session) {
				session.name = newName;
				await store.put(session);
			}
			await tx.done;

			setChatSessions(prevSessions => prevSessions.map(session => (session.id === sessionId ? { ...session, name: newName } : session)));
		} catch (error) {
			console.error("Error renaming chat session:", error);
		}
	};

	const deleteSession = async (sessionId: number) => {
		try {
			const db = await openDatabase();
			const tx = db.transaction("chatSessions", "readwrite");
			await tx.store.delete(sessionId);
			await tx.done;

			setChatSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));

			if (sessionId === activeSessionId) {
				const remainingSessions = chatSessions.filter(session => session.id !== sessionId);
				setActiveSessionId(remainingSessions.length > 0 ? remainingSessions[0].id : 0);
			}
		} catch (error) {
			console.error("Error deleting chat session:", error);
		}
	};

	const addChatSession = async (db: IDBPDatabase<unknown>) => {
		const now = new Date();
		const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
		const newSession = {
			id: Date.now(),
			name: `Chat - ${timeString}`,
		};
		const txAdd = db.transaction("chatSessions", "readwrite");
		await txAdd.store.add(newSession);
		await txAdd.done;

		const zz = [newSession, ...chatSessions];
		setChatSessions(zz);
		setActiveSessionId(newSession.id);
	};

	useEffect(() => {
		initializeChats();
	}, []);

	return {
		chatSessions,
		activeSessionId,
		setActiveSessionId,
		newChatSession,
		deleteSession,
		renameChatSession,
		chatSessionsLoading,
	};
};
