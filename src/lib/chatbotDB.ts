import { openDB } from "idb";

export const openDatabase = async () => {
	return await openDB("ChatAppDB", 3, {
		upgrade(db) {
			if (!db.objectStoreNames.contains("chatSessions")) {
				db.createObjectStore("chatSessions", { keyPath: "id", autoIncrement: true });
			}
			if (!db.objectStoreNames.contains("messages")) {
				db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
			}
		},
	});
};
