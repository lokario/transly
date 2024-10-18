import { Box, IconButton, Input, InputGroup, InputRightElement, useColorModeValue } from "@chakra-ui/react";
import React, { useRef } from "react";
import { IoSend } from "react-icons/io5";

function Entry({ onMsgSend }: { onMsgSend: (msg: string) => void }) {
	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const sendMessage = () => {
		if (inputRef.current) onMsgSend(inputRef.current.value);
		formRef.current?.reset();
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		sendMessage();
	};

	const inputShadow = useColorModeValue("input", "inputDark");
	const bgColor = useColorModeValue("brand.input", "brand.dark.input");

	return (
		<Box
			as="form"
			ref={formRef}
			onSubmit={onSubmit}>
			<InputGroup>
				<Input
					ref={inputRef}
					borderRadius={10}
					placeholder="Send a new message to translate"
					p="1.7rem"
					pr="4rem"
					bg={bgColor}
					border={0}
					boxShadow={inputShadow}
					size="lg"
					sx={{
						_focus: {
							boxShadow: inputShadow,
						},
					}}
				/>
				<InputRightElement
					height="100%"
					pr="2rem">
					<IconButton
						isRound={true}
						variant="solid"
						fontSize="20px"
						aria-label="send"
						onClick={sendMessage}
						icon={<IoSend />}
					/>
				</InputRightElement>
			</InputGroup>
		</Box>
	);
}

export default Entry;
