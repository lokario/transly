import { Box, Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { RiAddLargeLine } from "react-icons/ri";
import ChatSession from "../ChatSession";

interface SideBarProps {
	activeSessionId: number;
	chatSessions: { id: number; name: string }[];
	onSelectSession: (id: number) => void;
	handleSessionDelete: (id: number) => void;
	newChatSession: () => void;
	renameChatSession: (id: number, newName: string) => void;
}

function SideBar({ activeSessionId, chatSessions, onSelectSession, handleSessionDelete, newChatSession, renameChatSession }: SideBarProps) {
	return (
		<Box
			h="100vh"
			w="340px"
			p={8}
			display="flex"
			flexDirection="column">
			<HStack
				mb={8}
				justifyContent="center">
				<Image
					width="48px"
					alt="Logo"
					src="/assets/transly.svg"
				/>
				<Text
					fontSize="3xl"
					fontFamily="Fredoka">
					Transly
				</Text>
			</HStack>
			<Button
				mb={8}
				onClick={() => newChatSession()}
				leftIcon={<RiAddLargeLine />}
				variant="outline">
				New Chat
			</Button>
			<Heading
				as="h4"
				mb={4}
				size="md">
				Chats History
			</Heading>
			<VStack
				align="stretch"
				spacing={3}
				overflowY="auto"
				padding="0 10px"
				className="neat-scroll"
				flex={1}>
				{!chatSessions.length && (
					<Text
						fontSize="md"
						color="gray.400">
						Start a new conversation to get started.
					</Text>
				)}
				{chatSessions.map(session => (
					<ChatSession
						key={session.id}
						activeSessionId={activeSessionId}
						session={session}
						onSelectSession={onSelectSession}
						handleSessionDelete={handleSessionDelete}
						renameChatSession={renameChatSession}
					/>
				))}
			</VStack>
		</Box>
	);
}

export default SideBar;
