import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

function PrivacyConsent() {
	const [isVisible, setIsVisible] = useState(!localStorage.getItem("privacyConsent"));

	const handleAccept = () => {
		localStorage.setItem("privacyConsent", "accepted");
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<Box
			position="fixed"
			bottom="0"
			w="full"
			bg="gray.800"
			color="white"
			p={4}
			zIndex={10}
			textAlign="center">
			<Text>We use local storage to improve your experience. By using this app, you agree to our Privacy Policy.</Text>
			<Button
				colorScheme="blue"
				bg="brand.accent"
				color="white"
				mt={2}
				onClick={handleAccept}
				sx={{
					_hover: {
						bg: "brand.accentLight",
					},
				}}>
				Accept
			</Button>
		</Box>
	);
}

export default PrivacyConsent;
