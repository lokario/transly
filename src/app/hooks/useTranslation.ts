import { useEffect, useState } from "react";
import axios from "axios";

export const useTranslation = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [controller, setController] = useState<AbortController | null>(null);

	const translateMessage = async (text: string, sourceLang: string, targetLang: string) => {
		if (!isValidInput(text)) return { translatedText: "", error: "Message cannot be empty.", isPersistent: false };

		if (controller) controller.abort();

		const newController = new AbortController();
		setController(newController);
		const signal = newController.signal;

		setLoading(true);
		setError("");

		try {
			const response = await fetchTranslation(text, sourceLang, targetLang, signal);

			if (response.status !== 200) throw new Error(`API responded with status ${response.status}`);

			return { translatedText: response.data.translatedText, error: "", isPersistent: false };
		} catch (err: unknown) {
			const { errorMessage, isPersistent } = handleTranslationError(err);

			if (isPersistent) setError(errorMessage);

			console.error("Translation error:", err);
			return { translatedText: "", error: errorMessage, isPersistent };
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			if (controller) {
				controller.abort();
			}
		};
	}, [controller]);

	const isValidInput = (text: string) => {
		return text.trim().length > 0;
	};

	const fetchTranslation = async (text: string, sourceLang: string, targetLang: string, signal: AbortSignal) => {
		return await axios.post("/api/translate", { text, sourceLang, targetLang }, { timeout: 5000, signal });
	};

	const handleTranslationError = (err: unknown) => {
		let errorMessage = "Translation failed. Please try again.";
		let isPersistent = false;

		if (axios.isAxiosError(err)) {
			if (err.response) {
				switch (err.response.status) {
					case 400:
						errorMessage = "Please fill in all required fields.";
						isPersistent = true;
						break;
					case 403:
						errorMessage = "Authorization error. Please check your API key.";
						isPersistent = true;
						break;
					case 429:
						errorMessage = "Rate limit exceeded. Please try again later.";
						break;
					case 503:
						errorMessage = "Translation service is currently unavailable.";
						isPersistent = true;
						break;
					default:
						errorMessage = `Error: ${err.response.data?.error || errorMessage}`;
				}
			} else if (err.request) {
				errorMessage = "Network error. Please check your connection.";
				isPersistent = true;
			}
		}
		return { errorMessage, isPersistent };
	};

	return { translateMessage, loading, error };
};
