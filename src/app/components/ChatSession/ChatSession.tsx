import { ChatIcon } from "@chakra-ui/icons";
import { Editable, EditableInput, EditablePreview, Flex, HStack, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, useEditableControls } from "@chakra-ui/react";
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
						onClick={e => e.stopPropagation()} // Prevent onClick from triggering select session
					/>
					<MenuList>
						{/* Trigger edit mode using getEditButtonProps */}
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
			color="gray.500"
			fontWeight="medium"
			isPreviewFocusable={false}
			onSubmit={newName => renameChatSession(session.id, newName)}>
			<Flex
				key={session.id}
				p={3}
				bg={session.id == activeSessionId ? "gray.100" : "white"}
				borderRadius="lg"
				alignItems="center"
				justifyContent="space-between"
				cursor="pointer"
				_hover={{ bg: "gray.100" }}
				onClick={() => onSelectSession(session.id)}>
				<HStack spacing={3}>
					<ChatIcon
						boxSize="20px"
						color="gray.500"
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
