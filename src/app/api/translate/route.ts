import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import axios from "axios";

export async function POST(req: NextRequest) {
	try {
		const { text, sourceLang, targetLang } = await req.json();

		if (!text || !targetLang) return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });

		const cacheKey = `${sourceLang}:${targetLang}:${text}`;
		const cachedTranslation = await redis.get(cacheKey);

		if (cachedTranslation) return NextResponse.json({ translatedText: cachedTranslation });

		const apiKey = process.env.GOOGLE_API_KEY;
		const apiUrl = process.env.TRANSLATION_API_URL;

		if (!apiUrl) throw new Error("API URL is not defined. Please set the TRANSLATION_API_URL environment variable.");
		if (!apiKey) throw new Error("API KEY is not defined. Please set the GOOGLE_API_KEY environment variable.");

		const translatedText = await retryTranslation(apiUrl, {
			params: {
				q: text,
				source: sourceLang,
				target: targetLang,
				key: apiKey,
			},
		});

		await redis.set(cacheKey, translatedText, { ex: 60 * 60 * 24 });

		return NextResponse.json({ translatedText });
	} catch (err: any) {
		console.error("Translation error:", err.message || err);

		if (axios.isAxiosError(err)) {
			if (err.response) {
				if (err.response.status === 403) {
					return NextResponse.json({ error: "Forbidden: Incorrect API key or insufficient permissions." }, { status: 403 });
				} else if (err.response.status === 429) {
					return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429, headers: { "Retry-After": "60" } });
				} else {
					return NextResponse.json({ error: `Error from translation service: ${err.response.statusText}` }, { status: err.response.status });
				}
			} else if (err.request) {
				return NextResponse.json({ error: "Unable to connect to the translation service. Please check your internet connection." }, { status: 503 });
			}
		}

		return NextResponse.json({ error: "Internal Server Error. Please try again later." }, { status: 500 });
	}
}

export const retryTranslation = async (apiUrl: string, payload: any, retries = 3): Promise<string | null> => {
	let attempt = 0;

	while (attempt < retries) {
		try {
			const response = await axios.post(apiUrl, { timeout: 5000 }, payload);
			const translatedText = response.data.data.translations[0].translatedText;

			if (response.status !== 200 || !translatedText) throw new Error("Translation API returned an error or invalid response.");

			return translatedText;
		} catch (error) {
			attempt++;
			if (attempt >= retries) {
				console.error("Translation failed after retries:", error);
				throw new Error("Our translation service is currently unavailable. We're working to restore it as soon as possible.");
			}
		}
	}

	return null;
};
