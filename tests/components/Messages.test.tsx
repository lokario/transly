import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Messages from "../../src/app/components/Messages";

describe("Messages Component", () => {
	const renderWithChakra = (ui: React.ReactElement) => {
		return render(<ChakraProvider>{ui}</ChakraProvider>);
	};

	it("should render all messages", () => {
		const mockMessages = [
			{ id: 1, text: "Hello world!", isOwn: true, sessionId: 1 },
			{ id: 2, text: "How are you?", isOwn: false, sessionId: 1 },
			{ id: 3, text: "I'm a chatbot!", isOwn: false, sessionId: 1 },
		];

		renderWithChakra(<Messages messages={mockMessages} />);

		mockMessages.forEach(message => {
			expect(screen.getByText((content, element) => content.includes(message.text))).toBeInTheDocument();
		});
	});

	it("should scroll to the bottom when new messages are added", () => {
		const mockMessages = [
			{ id: 1, text: "Hello", isOwn: true, sessionId: 1 },
			{ id: 2, text: "New message!", isOwn: false, sessionId: 1 },
		];

		window.HTMLElement.prototype.scrollIntoView = jest.fn();

		renderWithChakra(<Messages messages={mockMessages} />);

		expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
	});
});
