import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Entry from "../../src/app/components/Entry";

describe("Entry Component", () => {
	const mockProps = {
		onMsgSend: jest.fn(),
	};

	const placeHolder = "Send a new message to translate";

	const renderWithChakra = (ui: React.ReactElement) => {
		return render(<ChakraProvider>{ui}</ChakraProvider>);
	};

	it("should render the input field and send button", () => {
		renderWithChakra(<Entry {...mockProps} />);

		expect(screen.getByPlaceholderText(placeHolder)).toBeInTheDocument();

		expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
	});

	it("should allow typing in the input field", () => {
		renderWithChakra(<Entry {...mockProps} />);

		const inputField = screen.getByPlaceholderText(placeHolder);
		fireEvent.change(inputField, { target: { value: "Hello, world!" } });

		expect(inputField).toHaveValue("Hello, world!");
	});

	it("should call onMsgSend when the send button is clicked", () => {
		renderWithChakra(<Entry {...mockProps} />);

		const inputField = screen.getByPlaceholderText(placeHolder);
		const sendButton = screen.getByRole("button", { name: /send/i });

		fireEvent.change(inputField, { target: { value: "Hello, world!" } });
		fireEvent.click(sendButton);

		expect(mockProps.onMsgSend).toHaveBeenCalledWith("Hello, world!");
	});

	it("should call onMsgSend when pressing the Enter key", () => {
		renderWithChakra(<Entry {...mockProps} />);

		const inputField = screen.getByPlaceholderText(placeHolder);

		fireEvent.change(inputField, { target: { value: "Hello, world!" } });
		fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

		expect(mockProps.onMsgSend).toHaveBeenCalledWith("Hello, world!");
	});

	it("should clear the input field after sending a message", () => {
		renderWithChakra(<Entry {...mockProps} />);

		const inputField = screen.getByPlaceholderText(placeHolder);
		const sendButton = screen.getByRole("button", { name: /send/i });

		fireEvent.change(inputField, { target: { value: "Hello, world!" } });
		fireEvent.click(sendButton);

		expect(inputField).toHaveValue("");
	});
});
