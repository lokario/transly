import { VStack } from "@chakra-ui/react";
import Message from "../Message";
import { Message as IMessage } from "@/app/page";
import { useEffect, useRef } from "react";

function Messages({ messages }: { messages: IMessage[] }) {
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<VStack p="2rem 1rem">
			{messages.map((msg, index) => (
				<Message
					key={index}
					text={msg.msg}
					isOwn={msg.isOwn}
				/>
			))}
			<div ref={messagesEndRef} />
		</VStack>
	);
}

export default Messages;
