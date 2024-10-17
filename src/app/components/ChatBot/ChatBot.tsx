import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Messages from "../Messages/Messages";
import Entry from "../Entry";
import Topbar from "../TopBar";
import { Message } from "@/app/page";

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
					bg="brand.bg"
					borderRadius={20}
					mr="2rem"
					padding="2rem"
					direction="column"
					height="calc(100vh - 8rem)">
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
						paddingRight="1rem">
						<Messages messages={messages} />
					</Box>
					<Entry onMsgSend={onMsgSend} />
				</Flex>
			</GridItem>
		</Grid>
	);
}

export default ChatBot;
