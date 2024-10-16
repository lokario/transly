"use client";

import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ChatBot from "./components/ChatBot";
import SideBar from "./components/SideBar";
import { useTranslation } from "./hooks/useTranslation";
import "./styles/globals.css";

export interface Message {
	isOwn: boolean;
	msg: string;
}

export default function Home() {
	const [sourceLang, setSourceLang] = useState<string>("en");
	const [targetLang, setTargetLang] = useState<string>("es");
	const [messages, setMessages] = useState<Message[]>([]);

	const toast = useToast();
	const { translateMessage, loading, error } = useTranslation();

	const handleSendMessage = async (msgText: string) => {
		const { translatedText, error: translationError, isPersistent } = await translateMessage(msgText, sourceLang, targetLang);

		if (translatedText) {
			setMessages(prevMessages => [...prevMessages, { isOwn: true, msg: msgText }]);
			setMessages(prevMessages => [...prevMessages, { isOwn: false, msg: translatedText }]);
		} else if (translationError && !isPersistent) {
			toast({
				title: "Translation Error",
				description: translationError,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		}
	};

	const handleSourceLang = (lang: string) => setSourceLang(lang);

	const handleTargetLang = (lang: string) => setTargetLang(lang);

	return (
		<Grid
			templateAreas={`"side main"`}
			gridTemplateRows={"1fr"}
			gridTemplateColumns={"260px 1fr"}
			bg="white"
			h="100vh">
			<GridItem
				bg="pink.300"
				area={"side"}>
				<SideBar />
			</GridItem>
			<GridItem area={"main"}>
				<ChatBot
					error={error}
					messages={messages}
					sourceLang={sourceLang}
					targetLang={targetLang}
					onSourceLang={handleSourceLang}
					onTargetLang={handleTargetLang}
					onMsgSend={handleSendMessage}
				/>
			</GridItem>
		</Grid>
	);
}
