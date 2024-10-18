import { renderHook, act } from "@testing-library/react";
import { useLangPreferences } from "../../src/app/hooks/useLangPreferences";

describe("useLangPreferences hook", () => {
	afterEach(() => {
		localStorage.clear();
	});

	it("should initialize with default languages 'en' for sourceLang and 'es' for targetLang", () => {
		const { result } = renderHook(() => useLangPreferences());
		expect(result.current.sourceLang).toBe("en");
		expect(result.current.targetLang).toBe("es");
	});

	it("should use stored languages from localStorage if available", () => {
		localStorage.setItem("sourceLang", "fr");
		localStorage.setItem("targetLang", "de");

		const { result } = renderHook(() => useLangPreferences());

		expect(result.current.sourceLang).toBe("fr");
		expect(result.current.targetLang).toBe("de");
	});

	it("should update sourceLang and store it in localStorage when saveSourceLang is called", () => {
		const { result } = renderHook(() => useLangPreferences());

		act(() => {
			result.current.saveSourceLang("it");
		});

		expect(result.current.sourceLang).toBe("it");
		expect(localStorage.getItem("sourceLang")).toBe("it");
	});

	it("should update targetLang and store it in localStorage when saveTargetLang is called", () => {
		const { result } = renderHook(() => useLangPreferences());

		act(() => {
			result.current.saveTargetLang("pt");
		});

		expect(result.current.targetLang).toBe("pt");
		expect(localStorage.getItem("targetLang")).toBe("pt");
	});
});
