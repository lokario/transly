import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Messages from "../Messages/Messages";
import Entry from "../Entry";
import Topbar from "../TopBar";
import { Message } from "@/app/page";

interface ChatBotProps {
	targetLang: string;
	sourceLang: string;
	messages: Message[];
	onMsgSend: (msg: string) => void;
	onSourceLang: (lang: string) => void;
	onTargetLang: (lang: string) => void;
}

function ChatBot({ onMsgSend, targetLang, sourceLang, messages, onSourceLang, onTargetLang }: ChatBotProps) {
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
					margin="2rem"
					mt={0}
					padding="1rem 2rem"
					direction="column"
					height="calc(100vh - 8rem)">
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
