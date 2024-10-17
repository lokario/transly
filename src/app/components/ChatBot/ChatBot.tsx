import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Entry from "../Entry";
import Topbar from "../TopBar";
import { Message } from "@/app/page";
import Messages from "../Messages";

interface ChatBotProps {
	error: string;
	targetLang: string;
	sourceLang: string;
	messages: Message[];
	onMsgSend: (msg: string) => void;
	onSourceLang: (lang: string) => void;
	onTargetLang: (lang: string) => void;
}

function ChatBot({ onMsgSend, error, targetLang, sourceLang, messages, onSourceLang, onTargetLang }: ChatBotProps) {
	const bgColor = useColorModeValue("brand.bg", "brand.dark.bg2");

	return (
		<Grid
			templateAreas={`"top" "messages"`}
			gridTemplateRows={"auto 1fr"}
			gridTemplateColumns={"1fr"}>
			<GridItem area={"top"}>
				<Topbar
					sourceLang={sourceLang}
					targetLang={targetLang}
					onSourceLang={onSourceLang}
					onTargetLang={onTargetLang}
				/>
			</GridItem>
			<GridItem area={"messages"}>
				<Flex
					bg={bgColor}
					borderRadius={20}
					mr={{ base: 0, md: "2rem" }}
					padding="2rem"
					direction="column"
					height={{ base: "calc(100vh - 4rem)", md: "calc(100vh - 8rem)" }}>
					{error && (
						<Alert
							status="error"
							mb={4}
							borderRadius="md">
							<AlertIcon />
							<AlertTitle mr={2}>An Error Occurred:</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<Box
						flex="1"
						overflowY="auto"
						paddingRight="1rem"
						className="neat-scroll">
						<Messages messages={messages} />
					</Box>
					<Entry onMsgSend={onMsgSend} />
				</Flex>
			</GridItem>
		</Grid>
	);
}

export default ChatBot;
