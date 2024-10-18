import { render, screen, fireEvent } from "@testing-library/react";
import ChatSession from "../../src/app/components/ChatSession/ChatSession";

describe("ChatSession Component", () => {
	const mockProps = {
		activeSessionId: 1,
		session: { id: 1, name: "Chat 1" },
		onSelectSession: jest.fn(),
		handleSessionDelete: jest.fn(),
		renameChatSession: jest.fn(),
	};

	it("should render the session name correctly", () => {
		render(<ChatSession {...mockProps} />);
		expect(screen.getByText("Chat 1")).toBeInTheDocument();
	});

	it("should call onSelectSession when the session is clicked", () => {
		render(<ChatSession {...mockProps} />);
		fireEvent.click(screen.getByText("Chat 1"));
		expect(mockProps.onSelectSession).toHaveBeenCalledWith(1);
	});

	it("should show options button on hover", async () => {
		render(<ChatSession {...mockProps} />);
		fireEvent.mouseOver(screen.getByText("Chat 1"));
		expect(screen.getByLabelText("Options")).toBeVisible();
	});

	it("should call renameChatSession when the name is changed", () => {
		render(<ChatSession {...mockProps} />);
		fireEvent.click(screen.getByText("Change name"));
		fireEvent.change(screen.getByDisplayValue("Chat 1"), {
			target: { value: "Updated Chat" },
		});
		fireEvent.keyDown(screen.getByDisplayValue("Updated Chat"), { key: "Enter", code: "Enter" });

		expect(mockProps.renameChatSession).toHaveBeenCalledWith(1, "Updated Chat");
	});

	it("should call handleSessionDelete when delete button is clicked", () => {
		render(<ChatSession {...mockProps} />);
		fireEvent.click(screen.getByLabelText("Options"));
		fireEvent.click(screen.getByText("Delete"));

		expect(mockProps.handleSessionDelete).toHaveBeenCalledWith(1);
	});
});
