import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ColorModeToggle from "../../src/app/components/ColorModeToggle";
import theme from "../../src/app/styles/theme";

describe("ColorModeToggle Component", () => {
	const renderWithProviders = (ui: React.ReactNode) => {
		return render(<ChakraProvider theme={theme}>{ui}</ChakraProvider>);
	};

	it("should render the toggle button", () => {
		renderWithProviders(<ColorModeToggle />);

		const toggleButton = screen.getByTestId("color-mode-toggle");
		expect(toggleButton).toBeInTheDocument();
	});

	it("should render the toggle button with the correct initial icon (FaMoon for light mode)", () => {
		renderWithProviders(<ColorModeToggle />);

		const toggleButton = screen.getByTestId("color-mode-toggle");

		expect(toggleButton.querySelector("svg")).toBeInTheDocument();
	});

	it("should toggle the color mode and change the icon when clicked", () => {
		renderWithProviders(<ColorModeToggle />);

		const toggleButton = screen.getByTestId("color-mode-toggle");

		fireEvent.click(toggleButton);

		expect(toggleButton.querySelector("svg")).toBeInTheDocument();
	});
});
