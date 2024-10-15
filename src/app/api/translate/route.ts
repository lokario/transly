import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import redis from "./redis";

export async function POST(req: NextRequest) {
	const { text, sourceLang, targetLang } = await req.json();
	const cacheKey = `${sourceLang}:${targetLang}:${text}`;

	try {
		const cachedTranslation = await redis.get(cacheKey);
		if (cachedTranslation) {
			console.log("Returning cached translation from Redis: ", cachedTranslation);
			return NextResponse.json({ translatedText: cachedTranslation });
		}
	} catch (err) {
		console.error("Error fetching from Redis:", err);
	}

	try {
		const response = await axios.post(
			`https://translation.googleapis.com/language/translate/v2`,
			{},
			{
				params: {
					q: text,
					source: sourceLang,
					target: targetLang,
					key: process.env.GOOGLE_API_KEY,
				},
			}
		);

		const translatedText = response.data.data.translations[0].translatedText;

		try {
			await redis.set(cacheKey, translatedText, "EX", 60 * 60 * 24);
		} catch (err) {
			console.error("Error saving to Redis:", err);
		}

		return NextResponse.json({ translatedText });
	} catch (error) {
		console.error("Translation error:", error);
		return NextResponse.json({ error: "Translation failed. Please try again." }, { status: 500 });
	}
}
