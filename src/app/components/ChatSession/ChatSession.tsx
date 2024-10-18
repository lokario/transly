import { ChatIcon } from "@chakra-ui/icons";
import { Editable, EditableInput, EditablePreview, Flex, HStack, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, useEditableControls, useColorModeValue } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";

interface ChatSessionProps {
	activeSessionId: number;
	session: { id: number; name: string };
	onSelectSession: (id: number) => void;
	handleSessionDelete: (id: number) => void;
	renameChatSession: (id: number, newName: string) => void;
}

function ChatSession({ activeSessionId, session, onSelectSession, handleSessionDelete, renameChatSession }: ChatSessionProps) {
	const textColor = useColorModeValue("gray.500", "gray.400");
	const textColorActive = useColorModeValue("gray.500", "gray.50");
	const bgColor = useColorModeValue("brand.highlight", "brand.dark.highlight");

	const EditableWrapper = ({ handleSessionDelete }: { handleSessionDelete: (id: number) => void }) => {
		const { isEditing, getEditButtonProps } = useEditableControls();

		if (!isEditing) {
			return (
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<SlOptions />}
						variant="ghost"
						onClick={e => e.stopPropagation()}
						opacity={{ base: "1", md: "0" }}
						_groupHover={{ opacity: "1" }}
					/>
					<MenuList>
						<MenuItem
							icon={<FiEdit2 />}
							{...getEditButtonProps()}>
							Change name
						</MenuItem>
						<MenuItem
							icon={<RiDeleteBin7Line />}
							onClick={e => {
								e.stopPropagation();
								handleSessionDelete(session.id);
							}}>
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			);
		}
	};

	return (
		<Editable
			defaultValue={session.name}
			fontSize={16}
			color={session.id == activeSessionId ? textColorActive : textColor}
			fontWeight="medium"
			isPreviewFocusable={false}
			onSubmit={newName => renameChatSession(session.id, newName)}>
			<Flex
				key={session.id}
				p={3}
				bg={session.id == activeSessionId ? bgColor : "transparent"}
				borderRadius="lg"
				alignItems="center"
				justifyContent="space-between"
				cursor="pointer"
				_hover={{ bg: bgColor, color: textColorActive }}
				onClick={() => onSelectSession(session.id)}
				role="group">
				<HStack spacing={3}>
					<ChatIcon
						boxSize="20px"
						color={session.id == activeSessionId ? textColorActive : textColor}
						_groupHover={{ color: textColorActive }}
					/>
					<EditablePreview />
					<Input as={EditableInput} />
				</HStack>
				<EditableWrapper handleSessionDelete={handleSessionDelete} />
			</Flex>
		</Editable>
	);
}

export default ChatSession;
