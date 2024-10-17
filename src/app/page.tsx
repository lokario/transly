"use client";

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Grid, GridItem, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ChatBot from "./components/ChatBot";
import SideBar from "./components/SideBar";
import { useChatSessions } from "./hooks/useChatSessions";
import { useMessages } from "./hooks/useMessages";
import { useTranslation } from "./hooks/useTranslation";
import "./styles/globals.css";
import { useLangPreferences } from "./hooks/useLangPreferences";
import PrivacyConsent from "./components/PrivacyConsent";

export default function Home() {
	const { sourceLang, targetLang, saveSourceLang, saveTargetLang } = useLangPreferences();

	const toast = useToast();
	const cancelRef = useRef(null);
	const [chatForDelete, setChatForDelete] = useState<number>(0);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { translateMessage, translateLoading, error } = useTranslation();
	const { chatSessions, activeSessionId, setActiveSessionId, chatSessionsLoading, newChatSession, deleteSession, renameChatSession } = useChatSessions();
	const { messages, fetchMessages, addMessage, deleteMessagesForSession } = useMessages();

	useEffect(() => {
		if (activeSessionId) fetchMessages(activeSessionId);
	}, [activeSessionId]);

	const handleSendMessage = async (msgText: string) => {
		const { translatedText, error: translationError, isPersistent } = await translateMessage(msgText, sourceLang, targetLang);

		if (translatedText && activeSessionId) {
			addMessage(activeSessionId, msgText, true);
			addMessage(activeSessionId, translatedText, false);
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

	const confirmSessionDelete = () => {
		deleteMessagesForSession(chatForDelete);
		deleteSession(chatForDelete);
		setChatForDelete(0);
		onClose();
	};

	const handleSessionDelete = (sessionId: number) => {
		setChatForDelete(sessionId);

		onOpen();
	};

	const handleSourceLang = (lang: string) => saveSourceLang(lang);

	const handleTargetLang = (lang: string) => saveTargetLang(lang);

	return (
		<>
			<PrivacyConsent />
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize="lg"
							fontWeight="bold">
							Delete Chat
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={confirmSessionDelete}
								ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<Grid
				templateAreas={`"side main"`}
				gridTemplateRows={"1fr"}
				gridTemplateColumns={"auto 1fr"}
				bg="white"
				h="100vh">
				<GridItem area={"side"}>
					<SideBar
						chatSessionsLoading={chatSessionsLoading}
						renameChatSession={renameChatSession}
						handleSessionDelete={handleSessionDelete}
						newChatSession={newChatSession}
						activeSessionId={activeSessionId}
						onSelectSession={id => setActiveSessionId(id)}
						chatSessions={chatSessions}
					/>
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
		</>
	);
}
