import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	shadows: {
		msgOther: "0 2px 3px 0 rgba(138, 155, 232, 0.1)",
		msgOwn: "0 2px 3px 0 rgba(6xp9, 133, 252, 0.3)",
		deep: "0 10px 15px -3px rgba(138, 155, 232, 0.1),0 4px 6px -2px rgba(138, 155, 232, 0.05)",
		input: "0 10px 15px -3px rgba(138, 155, 232, 0.1),0 4px 6px -2px rgba(138, 155, 232, 0.05)",
		inputDark: "0 10px 15px -3px rgba(16, 16, 16, 0.4),0 4px 6px -2px rgba(16, 16, 16, 0.2)",
	},
	colors: {
		brand: {
			bg: "#F5F7FD",
			accent: "#4160FA",
			accentLight: "#4B6FF9",
			highlight: "#EDF2F7",
			input: "#FFFFFF",

			dark: {
				bg2: "#18181A",
				bg: "#101012",
				highlight: "#18181A",
				accent: "#4160FA",
				input: "#232326",
			},
		},
	},
});

export default theme;
