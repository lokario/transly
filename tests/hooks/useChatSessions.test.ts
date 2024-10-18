import { renderHook, act } from "@testing-library/react";
import { openDatabase } from "../../src/lib/chatbotDB";
import { useChatSessions } from "../../src/app/hooks/useChatSessions";

jest.mock("../../src/lib/chatbotDB", () => ({
	openDatabase: jest.fn(),
}));

const mockStore = {
	getAll: jest.fn().mockResolvedValue([]),
	add: jest.fn(),
	get: jest.fn().mockResolvedValue(null),
	put: jest.fn().mockResolvedValue(undefined),
	delete: jest.fn(),
};

const mockTransaction = {
	objectStore: jest.fn(() => mockStore),
	store: mockStore,
	done: Promise.resolve(),
};

const mockDB = {
	transaction: jest.fn(() => mockTransaction),
};

(openDatabase as jest.Mock).mockImplementation(async () => mockDB);

describe("useChatSessions hook", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should autoamtically create a chat session the first time it loads", async () => {
		mockStore.getAll.mockResolvedValueOnce([]);

		const { result } = renderHook(() => useChatSessions());
		await act(async () => {});

		expect(result.current.chatSessions.length).toEqual(1);
	});

	it("should initialize with existing chat sessions", async () => {
		const sessions = [
			{ id: 1, name: "Chat 1" },
			{ id: 2, name: "Chat 2" },
		];
		mockStore.getAll.mockResolvedValueOnce(sessions);

		const { result } = renderHook(() => useChatSessions());
		await act(async () => {});

		expect(result.current.chatSessions).toEqual(sessions.reverse());
		expect(result.current.activeSessionId).toBe(sessions[1].id);
		expect(result.current.chatSessionsLoading).toBe(false);
	});

	it("should add a new chat session and set it as active", async () => {
		const { result } = renderHook(() => useChatSessions());

		await act(async () => {
			await result.current.newChatSession();
		});

		expect(mockStore.add).toHaveBeenCalled();
		expect(result.current.chatSessions).toHaveLength(1);
		expect(result.current.activeSessionId).toBe(result.current.chatSessions[0].id);
	});

	it("should rename a chat session", async () => {
		const session = { id: 1, name: "Old Name" };
		mockStore.getAll.mockResolvedValueOnce([session]);

		const { result } = renderHook(() => useChatSessions());
		await act(async () => {});

		await act(async () => {
			await result.current.renameChatSession(1, "New Name");
		});

		expect(result.current.chatSessions[0].name).toBe("New Name");
	});

	it("should delete a chat session and update the active session", async () => {
		const sessions = [
			{ id: 1, name: "Chat 1" },
			{ id: 2, name: "Chat 2" },
		];
		mockStore.getAll.mockResolvedValueOnce(sessions);

		const { result } = renderHook(() => useChatSessions());
		await act(async () => {});

		await act(async () => {
			await result.current.deleteSession(1);
		});

		expect(mockStore.delete).toHaveBeenCalledWith(1);
		expect(result.current.chatSessions).toHaveLength(1);
		expect(result.current.chatSessions[0].id).toBe(2);
		expect(result.current.activeSessionId).toBe(2);
	});
});
