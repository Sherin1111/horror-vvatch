import { useAuth } from "@/context/AuthContext";
import {
	HStack,
	Flex,
	Box,
	Text,
	Link as ChakraLink,
	Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
	const { user, logout } = useAuth();

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
					<ChakraLink asChild fontFamily="mainFont" color="paleLavender">
						<RouterLink to="/browse">Browse</RouterLink>
					</ChakraLink>

					<ChakraLink asChild fontFamily="mainFont" color="paleLavender">
						<RouterLink to="/watchlist/users/:userId">Watchlist</RouterLink>
					</ChakraLink>
					{user ? (
						<>
							<Text color="pink" fontFamily="mainFont" fontWeight="bold">
								Welcome, {user.username}
							</Text>
							<Button
								fontFamily="accentFont"
								fontWeight="bold"
								bg="purple"
								_hover={{ bg: "pink" }}
								onClick={logout}>
								Logout
							</Button>
						</>
					) : (
						<>
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
						</>
					)}
				</HStack>
			</Box>
		</Flex>
	);
}

export default Navbar;
