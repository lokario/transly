import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	shadows: {
		msgOther: "0 2px 3px 0 rgba(138, 155, 232, 0.1)",
		msgOwn: "0 2px 3px 0 rgba(69, 133, 252, 0.3)",
		deep: "0 10px 15px -3px rgba(138, 155, 232, 0.1),0 4px 6px -2px rgba(138, 155, 232, 0.05)",
	},
	colors: {
		brand: {
			bg: "#F5F7FD",
			accent: "#EBEFFB",
		},
	},
});

export default theme;
