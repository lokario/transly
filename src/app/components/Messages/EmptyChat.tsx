import { Box, Flex, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { BsTranslate } from "react-icons/bs";
import { FaCog, FaExclamationTriangle } from "react-icons/fa";

function EmptyChatState() {
	const fgColor = useColorModeValue("gray.50", "whiteAlpha.50");
	const bgColor = useColorModeValue("brand.input", "brand.dark.input");
	return (
		<Flex
			justify="space-around"
			p={6}
			h="100%"
			align="center">
			<Box
				w={{ base: "100%", md: "30%" }}
				p={5}
				bg={bgColor}
				boxShadow="sm"
				borderRadius="md">
				<VStack
					spacing={4}
					align="start">
					<Flex
						w="100%"
						alignItems="center"
						gap={4}
						direction="column">
						<Box
							as={BsTranslate}
							color="blue.400"
							boxSize={10}
						/>
						<Heading size="md">Examples</Heading>
					</Flex>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Translate &quot;Hello&quot; to Russian.
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Translate &quot;Good morning&quot; to French.
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						How do you say &quot;Thank you&quot; in German?
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Translate &quot;Happy Birthday&quot; to Spanish.
					</Text>
				</VStack>
			</Box>

			<Box
				w="30%"
				p={5}
				bg={bgColor}
				boxShadow="sm"
				borderRadius="md"
				display={{ base: "none", md: "block" }}>
				<VStack
					spacing={4}
					align="start">
					<Flex
						w="100%"
						alignItems="center"
						gap={4}
						direction="column">
						<Box
							as={FaCog}
							color="teal.400"
							boxSize={10}
						/>
						<Heading size="md">Capabilities</Heading>
					</Flex>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Translates between 50+ languages in real-time.
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Detects the source language automatically.
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Supports informal and formal translation modes.
					</Text>
				</VStack>
			</Box>

			<Box
				w="30%"
				p={5}
				bg={bgColor}
				boxShadow="sm"
				borderRadius="md"
				display={{ base: "none", md: "block" }}>
				<VStack
					spacing={4}
					align="start">
					<Flex
						w="100%"
						alignItems="center"
						gap={4}
						direction="column">
						<Box
							as={FaExclamationTriangle}
							color="red.400"
							boxSize={10}
						/>
						<Heading size="md">Limitations</Heading>
					</Flex>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						May produce incorrect translations for nuanced phrases.
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Cannot hold context across multiple messages.
					</Text>
					<Text
						w="100%"
						padding={2}
						bg={fgColor}
						borderRadius={6}>
						Limited to basic conversational translation.
					</Text>
				</VStack>
			</Box>
		</Flex>
	);
}

export default EmptyChatState;
