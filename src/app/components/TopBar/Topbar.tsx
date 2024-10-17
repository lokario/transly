import { Box, Flex, HStack, Select, useColorModeValue } from "@chakra-ui/react";
import { TbSwitchHorizontal } from "react-icons/tb";
import { languageOptions } from "./langOptions";

interface TopBarProps {
	targetLang: string;
	sourceLang: string;
	onSourceLang: (lang: string) => void;
	onTargetLang: (lang: string) => void;
}

function Topbar({ onSourceLang, onTargetLang, targetLang, sourceLang }: TopBarProps) {
	return (
		<Box>
			<Flex
				height={{ base: "4rem", md: "6rem" }}
				justifyContent="center"
				alignItems={"center"}>
				<HStack>
					<Select
						value={sourceLang}
						onChange={e => onSourceLang(e.target.value)}
						bg={useColorModeValue("brand.input", "brand.dark.input")}
						sx={{
							_focus: {
								boxShadow: "none",
								borderColor: "gray.300",
							},
						}}
						width={{ base: "7rem", md: "auto" }}
						placeholder="Source Language">
						<option value="">AutoDetect Language</option>

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
						bg={useColorModeValue("brand.input", "brand.dark.input")}
						sx={{
							_focus: {
								boxShadow: "none",
								borderColor: "gray.300",
							},
						}}
						width={{ base: "7rem", md: "auto" }}
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
