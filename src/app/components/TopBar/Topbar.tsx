import { Box, Divider, Flex, HStack, Select } from "@chakra-ui/react";
import { TbSwitchHorizontal } from "react-icons/tb";
import { languageOptions } from "./langOptions";
import { useRef } from "react";

interface TopBarProps {
	targetLang: string;
	sourceLang: string;
	onSourceLang: (lang: string) => void;
	onTargetLang: (lang: string) => void;
}

function Topbar({ onSourceLang, onTargetLang, targetLang, sourceLang }: TopBarProps) {
	const sourceRef = useRef<HTMLInputElement>(null);
	const targetRef = useRef<HTMLInputElement>(null);

	return (
		<Box>
			<Flex
				height="6rem"
				justifyContent="center"
				alignItems={"center"}>
				<HStack>
					<Select
						value={sourceLang}
						onChange={e => onSourceLang(e.target.value)}
						bg="whiteAlpha.600"
						sx={{
							_focus: {
								boxShadow: "none",
								borderColor: "gray.300",
							},
						}}
						placeholder="Source Language">
						<option value="auto">AutoDetect Language</option>

						{languageOptions.map(lang => (
							<option
								key={lang.code}
								value={lang.code}>
								{lang.name}
							</option>
						))}
					</Select>
					<Box m="0 0.5rem">
						<TbSwitchHorizontal size={26} />
					</Box>
					<Select
						value={targetLang}
						onChange={e => onTargetLang(e.target.value)}
						bg="whiteAlpha.600"
						sx={{
							_focus: {
								boxShadow: "none",
								borderColor: "gray.300",
							},
						}}
						placeholder="Target Language">
						{languageOptions.map(lang => (
							<option
								key={lang.code}
								value={lang.code}>
								{lang.name}
							</option>
						))}
					</Select>
				</HStack>
			</Flex>
		</Box>
	);
}

export default Topbar;
