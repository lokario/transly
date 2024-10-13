"use client";

import { useState } from "react";
import axios from "axios";

interface Message {
	original: string;
	translated: string;
}

export default function Home() {
	const [text, setText] = useState<string>("");
	const [sourceLang, setSourceLang] = useState<string>("en");
	const [targetLang, setTargetLang] = useState<string>("es");
	const [messages, setMessages] = useState<Message[]>([]);
	const [error, setError] = useState<string | null>(null);

	const handleSendMessage = async () => {
		if (!text.trim()) {
			setError("Message cannot be empty.");
			return;
		}

		try {
			const response = await axios.post("/api/translate", { text, sourceLang, targetLang });
			const translatedText = response.data.translatedText;

			setMessages(prevMessages => [...prevMessages, { original: text, translated: translatedText }]);

			setText("");
			setError(null);
		} catch (err) {
			setError("Translation failed. Please try again.");
			console.error("Translation error:", err);
		}
	};

	return (
		<div>
			<h1>Translation Chatbot</h1>

			<textarea
				placeholder="Type a message"
				value={text}
				onChange={e => setText(e.target.value)}
			/>

			<div>
				<label>
					Source Language:
					<select
						value={sourceLang}
						onChange={e => setSourceLang(e.target.value)}>
						<option value="en">English</option>
						<option value="es">Spanish</option>
					</select>
				</label>

				<label>
					Target Language:
					<select
						value={targetLang}
						onChange={e => setTargetLang(e.target.value)}>
						<option value="es">Spanish</option>
						<option value="en">English</option>
					</select>
				</label>
			</div>

			<button onClick={handleSendMessage}>Send</button>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<div>
				<h3>Messages:</h3>
				{messages.map((msg, index) => (
					<div key={index}>
						<p>
							<strong>Original:</strong> {msg.original}
						</p>
						<p>
							<strong>Translated:</strong> {msg.translated}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
