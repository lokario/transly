import { Avatar, Flex } from "@chakra-ui/react";
import { LuLanguages } from "react-icons/lu";

interface MessageProps {
	text: string;
	isOwn: boolean;
}

function Message({ text, isOwn }: MessageProps) {
	return (
		<Flex
			w="100%"
			justifyContent={isOwn ? "flex-end" : "flex-start"}>
			{!isOwn && (
				<Avatar
					bg="gray.300"
					float="right"
					mr="1rem"
					icon={<LuLanguages fontSize="1.5rem" />}
				/>
			)}

			<Flex
				bg={isOwn ? "#4160FA" : "white"}
				alignItems="center"
				borderRadius="100"
				boxShadow={isOwn ? "msgOwn" : "msgOther"}
				p="0rem 1.25rem"
				color={isOwn ? "white" : "black"}>
				{text}
			</Flex>

			{isOwn && (
				<Avatar
					bg="gray.300"
					float="right"
					ml="1rem"
					src="https://api.dicebear.com/9.x/personas/svg?seed=BotTranslation"
				/>
			)}
		</Flex>
	);
}

export default Message;
