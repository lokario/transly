import { Message as IMessage } from "@/app/page";
import { VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Message from "../Message";
import EmptyChatState from "./EmptyChat";

function Messages({ messages }: { messages: IMessage[] }) {
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<VStack
			p="2rem 1rem"
			h="100%">
			{!messages.length && <EmptyChatState />}
			{messages.map((msg, index) => (
				<Message
					key={index}
					text={msg.text}
					isOwn={msg.isOwn}
				/>
			))}
			<div ref={messagesEndRef} />
		</VStack>
	);
}

export default Messages;
