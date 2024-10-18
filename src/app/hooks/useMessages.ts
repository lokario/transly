import { useState } from "react";
import { openDatabase } from "../../lib/chatbotDB";

export interface Message {
	id: number;
	sessionId: number;
	text: string;
	timestamp: number;
	isOwn: boolean;
}

export const useMessages = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const fetchMessages = async (sessionId: number) => {
		if (typeof window === "undefined") return;

		try {
			const db = await openDatabase();
			const tx = db.transaction("messages", "readonly");
			const store = tx.objectStore("messages");
			const allMessages = await store.getAll();
			const sessionMessages = allMessages.filter(message => message.sessionId === sessionId);

			setMessages(sessionMessages);
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	};

	const addMessage = async (sessionId: number, text: string, isOwn: boolean) => {
		try {
			const db = await openDatabase();
			const newMessage = {
				id: Date.now(),
				sessionId,
				text,
				timestamp: Date.now(),
				isOwn,
			};
			const tx = db.transaction("messages", "readwrite");
			await tx.store.add(newMessage);
			await tx.done;

			setMessages(prev => [...prev, newMessage]);
		} catch (error) {
			console.error("Error adding message:", error);
		}
	};

	const deleteMessagesForSession = async (sessionId: number) => {
		if (typeof window === "undefined") return;

		try {
			const db = await openDatabase();
			const tx = db.transaction("messages", "readwrite");
			const store = tx.objectStore("messages");
			const cursor = await store.openCursor();

			while (cursor) {
				if (cursor.value.sessionId === sessionId) await cursor.delete();
				await cursor.continue();
			}

			if (messages.length && messages[0].sessionId == sessionId) setMessages([]);
		} catch (error) {
			console.error("Error deleting messages:", error);
		}
	};

	return {
		messages,
		fetchMessages,
		addMessage,
		deleteMessagesForSession,
	};
};
