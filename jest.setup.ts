import "@testing-library/jest-dom";

Object.defineProperty(window, "scrollTo", {
	value: jest.fn(),
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
	value: jest.fn(),
	writable: true,
});

Object.defineProperty(window, "scrollIntoView", {
	value: jest.fn(),
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
	value: jest.fn(),
	writable: true,
});

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	}),
});

Object.defineProperty(window, "localStorage", {
	value: (() => {
		let store: Record<string, string> = {};
		return {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => {
				store[key] = value;
			},
			clear: () => {
				store = {};
			},
		};
	})(),
});
