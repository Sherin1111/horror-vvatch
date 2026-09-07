import { HStack, Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
	return (
		<Flex bg="navyLight" as="nav" align="center" justify="space-between">
			<Box>
				<Text
					fontSize="2xl"
					fontFamily="branding"
					color="green"
					paddingLeft="30px">
					Horror VVatch
				</Text>
			</Box>
			<Box>
				<HStack gap={{ base: "15px", md: "45px", xl: "90px" }}>
					<ChakraLink asChild fontFamily="mainFont" color="paleLavender">
						<RouterLink to="/">Home </RouterLink>
					</ChakraLink>
					<ChakraLink fontFamily="mainFont" color="paleLavender">
						Browse
					</ChakraLink>
					<ChakraLink fontFamily="mainFont" color="paleLavender">
						Search
					</ChakraLink>
					<ChakraLink asChild fontFamily="mainFont" color="paleLavender">
						<RouterLink to="/watchlist/users/:userId">Watchlist</RouterLink>
					</ChakraLink>
					<ChakraLink asChild fontFamily="mainFont" color="paleLavender">
						<RouterLink to="/login">Login</RouterLink>
					</ChakraLink>
					<ChakraLink
						asChild
						fontFamily="mainFont"
						color="paleLavender"
						paddingRight="20px">
						<RouterLink to="/registration">Sign up </RouterLink>
					</ChakraLink>
				</HStack>
			</Box>
		</Flex>
	);
}

export default Navbar;
