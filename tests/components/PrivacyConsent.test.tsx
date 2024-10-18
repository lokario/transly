import { render, screen, fireEvent } from "@testing-library/react";
import PrivacyConsent from "../../src/app/components/PrivacyConsent";

const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string): string | null => store[key] || null,
		setItem: (key: string, value: string): void => {
			store[key] = value;
		},
		clear: (): void => {
			store = {};
		},
	};
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("PrivacyConsent Component", () => {
	const consentMsg = /we use local storage to improve your experience/i;

	afterEach(() => {
		localStorage.clear();
	});

	it("should render the privacy consent banner if privacy consent is not set", () => {
		render(<PrivacyConsent />);
		const bannerText = screen.getByText(consentMsg);
		expect(bannerText).toBeInTheDocument();
	});

	it("should not render the privacy consent banner if privacy consent is set", () => {
		localStorage.setItem("privacyConsent", "accepted");
		render(<PrivacyConsent />);
		const bannerText = screen.queryByText(consentMsg);
		expect(bannerText).not.toBeInTheDocument();
	});

	it("should hide the banner after clicking the accept button", () => {
		render(<PrivacyConsent />);
		const acceptButton = screen.getByRole("button", { name: /accept/i });
		fireEvent.click(acceptButton);
		expect(screen.queryByText(consentMsg)).not.toBeInTheDocument();
		expect(localStorage.getItem("privacyConsent")).toBe("accepted");
	});
});
