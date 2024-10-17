import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const ColorModeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<IconButton
			aria-label="Toggle dark mode"
			icon={colorMode === "light" ? <FaMoon /> : <FiSun />}
			onClick={toggleColorMode}
			position="absolute"
			top={4}
			right={4}
		/>
	);
};

export default ColorModeToggle;
