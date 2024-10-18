import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import { useTranslation } from "../../src/app/hooks/useTranslation";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("useTranslation hook", () => {
	afterEach(() => {
		mock.reset();
	});

	it("should initialize with loading as false and no error", () => {
		const { result } = renderHook(() => useTranslation());
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBe("");
	});

	it("should translate a message successfully", async () => {
		mock.onPost("/api/translate").reply(200, {
			translatedText: "Hola",
		});

		const { result } = renderHook(() => useTranslation());

		let response;
		await act(async () => {
			response = await result.current.translateMessage("Hello", "en", "es");
		});

		expect(response.translatedText).toBe("Hola");
		expect(response.error).toBe("");
		expect(result.current.loading).toBe(false);
	});

	it("should handle empty input", async () => {
		const { result } = renderHook(() => useTranslation());

		let response;
		await act(async () => {
			response = await result.current.translateMessage("", "en", "es");
		});

		expect(response.error).toBe("Message cannot be empty.");
		expect(response.translatedText).toBe("");
		expect(result.current.loading).toBe(false);
	});

	it("should handle API error with persistent error message", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

		mock.onPost("/api/translate").reply(403);

		const { result } = renderHook(() => useTranslation());

		let response;
		await act(async () => {
			response = await result.current.translateMessage("Hello", "en", "es");
		});

		expect(response.error).toBe("Authorization error. Please check your API key.");
		expect(response.translatedText).toBe("");
		expect(result.current.loading).toBe(false);

		consoleErrorSpy.mockRestore();
	});

	it("should abort an ongoing translation request when a new request is initiated", async () => {
		const { result } = renderHook(() => useTranslation());

		mock.onPost("/api/translate").reply(() => new Promise(() => {}));

		await act(async () => {
			result.current.translateMessage("Hello", "en", "es");
		});

		const abortSpy = jest.spyOn(AbortController.prototype, "abort");
		await act(async () => {
			result.current.translateMessage("Hola", "es", "en");
		});

		expect(abortSpy).toHaveBeenCalled();
		abortSpy.mockRestore();
	});
});
