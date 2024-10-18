import { renderHook, act } from "@testing-library/react";
import { openDatabase } from "../../src/lib/chatbotDB";
import { useMessages } from "../../src/app/hooks/useMessages";

jest.mock("../../src/lib/chatbotDB", () => ({
	openDatabase: jest.fn(),
}));

const mockStore = {
	getAll: jest.fn().mockResolvedValue([]),
	add: jest.fn(),
	openCursor: jest.fn(),
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

describe("useMessages hook", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with an empty messages array", () => {
		const { result } = renderHook(() => useMessages());
		expect(result.current.messages).toEqual([]);
	});

	it("should fetch messages for a given session ID", async () => {
		const sessionMessages = [
			{ id: 1, sessionId: 123, text: "Hello", timestamp: Date.now(), isOwn: true },
			{ id: 2, sessionId: 123, text: "How are you?", timestamp: Date.now(), isOwn: false },
		];
		mockStore.getAll.mockResolvedValueOnce(sessionMessages);

		const { result } = renderHook(() => useMessages());

		await act(async () => {
			await result.current.fetchMessages(123);
		});

		expect(result.current.messages).toEqual(sessionMessages);
	});

	it("should add a new message and update the state", async () => {
		const { result } = renderHook(() => useMessages());

		const newMessage = {
			id: expect.any(Number),
			sessionId: 123,
			text: "New message",
			timestamp: expect.any(Number),
			isOwn: true,
		};

		await act(async () => {
			await result.current.addMessage(123, "New message", true);
		});

		expect(mockStore.add).toHaveBeenCalledWith(expect.objectContaining(newMessage));
		expect(result.current.messages).toContainEqual(expect.objectContaining(newMessage));
	});

	it("should delete all messages for a given session ID", async () => {
		const sessionMessages = [
			{ id: 1, sessionId: 123, text: "Hello", timestamp: Date.now(), isOwn: true },
			{ id: 2, sessionId: 123, text: "How are you?", timestamp: Date.now(), isOwn: false },
		];
		mockStore.getAll.mockResolvedValueOnce(sessionMessages);

		const { result } = renderHook(() => useMessages());

		await act(async () => {
			await result.current.fetchMessages(123);
		});

		await act(async () => {
			await result.current.deleteMessagesForSession(123);
		});

		expect(result.current.messages).toEqual([]);
	});
});
