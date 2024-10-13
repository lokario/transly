import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
	title: "Language Translation Chatbot",
	description: "A chatbot that can translate text between multiple languages in real-time within a chat interface",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
