"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./styles/globals.css";
import theme from "./styles/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<title>Transly</title>
				<meta
					name="description"
					content="Transly, a chatbot that provides translations"
				/>
			</head>
			<body>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					{children}
				</ChakraProvider>
			</body>
		</html>
	);
}