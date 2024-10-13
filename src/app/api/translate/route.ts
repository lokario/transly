import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
	try {
		const { text, sourceLang, targetLang } = await req.json();
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

		return NextResponse.json({ translatedText });
	} catch (error) {
		console.error("Translation error:", error);
		return NextResponse.json({ error: "Translation failed. Please try again." }, { status: 500 });
	}
}
