import { useState } from "react";
import axios from "axios";

export const useTranslation = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const translateMessage = async (text: string, sourceLang: string, targetLang: string) => {
		if (!text.trim()) {
			setError("Message cannot be empty.");
			return null;
		}

		setLoading(true);
		try {
			const response = await axios.post("/api/translate", {
				text,
				sourceLang,
				targetLang,
			});

			setError(null);
			return response.data.translatedText;
		} catch (err) {
			setError("Translation failed. Please try again.");
			console.error("Translation error:", err);
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { translateMessage, loading, error };
};
