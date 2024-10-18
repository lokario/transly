import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SideBar from "../../src/app/components/SideBar/SideBar";

describe("SideBar Component", () => {
	const mockProps = {
		chatSessionsLoading: false,
		activeSessionId: 1,
		chatSessions: [
			{ id: 1, name: "Chat 1" },
			{ id: 2, name: "Chat 2" },
		],
		onSelectSession: jest.fn(),
		handleSessionDelete: jest.fn(),
		newChatSession: jest.fn(),
		renameChatSession: jest.fn(),
	};

	it("should render the logo and title", () => {
		render(<SideBar {...mockProps} />);

		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByText("Transly")).toBeInTheDocument();
	});

	it("should render the 'New Chat' button and respond to clicks", () => {
		render(<SideBar {...mockProps} />);

		const newChatButton = screen.getByText("New Chat");
		expect(newChatButton).toBeInTheDocument();

		fireEvent.click(newChatButton);
		expect(mockProps.newChatSession).toHaveBeenCalled();
	});

	it("should display message when there are no chat sessions", () => {
		render(
			<SideBar
				{...mockProps}
				chatSessions={[]}
			/>
		);

		expect(screen.getByText("Start a new conversation to get started.")).toBeInTheDocument();
	});

	it("should render all chat sessions", async () => {
		render(<SideBar {...mockProps} />);

		await waitFor(() => {
			expect(screen.getByText("Chat 1")).toBeInTheDocument();
			expect(screen.getByText("Chat 2")).toBeInTheDocument();
		});
	});

	it("should call onSelectSession when a chat session is clicked", () => {
		render(<SideBar {...mockProps} />);

		fireEvent.click(screen.getByText("Chat 1"));
		expect(mockProps.onSelectSession).toHaveBeenCalledWith(1);
	});
});
