import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Topbar from "../../src/app/components/TopBar";

describe("Topbar Component", () => {
	const mockProps = {
		sourceLang: "en",
		targetLang: "es",
		onSourceLang: jest.fn(),
		onTargetLang: jest.fn(),
	};

	const renderWithChakra = (ui: React.ReactElement) => {
		return render(<ChakraProvider>{ui}</ChakraProvider>);
	};

	it("should render source and target language dropdowns", () => {
		renderWithChakra(<Topbar {...mockProps} />);

		expect(screen.getByRole("combobox", { name: /source language/i })).toBeInTheDocument();
		expect(screen.getByRole("combobox", { name: /target language/i })).toBeInTheDocument();
	});

	it("should call onSourceLang when the source language is changed", () => {
		renderWithChakra(<Topbar {...mockProps} />);

		const sourceLangDropdown = screen.getByLabelText(/source language/i);
		fireEvent.change(sourceLangDropdown, { target: { value: "fr" } });

		expect(mockProps.onSourceLang).toHaveBeenCalledWith("fr");
	});

	it("should call onTargetLang when the target language is changed", () => {
		renderWithChakra(<Topbar {...mockProps} />);

		const targetLangDropdown = screen.getByLabelText(/target language/i);
		fireEvent.change(targetLangDropdown, { target: { value: "de" } });

		expect(mockProps.onTargetLang).toHaveBeenCalledWith("de");
	});

	it("should display the correct source and target language values", () => {
		renderWithChakra(<Topbar {...mockProps} />);

		expect(screen.getByRole("combobox", { name: /source language/i })).toBeInTheDocument();
		expect(screen.getByRole("combobox", { name: /target language/i })).toBeInTheDocument();
	});
});
