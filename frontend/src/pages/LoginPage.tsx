import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Box, Center, Heading } from "@chakra-ui/react";

function LoginPage() {
	const navigate = useNavigate();

	const { login } = useAuth();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loginMessage, setLoginMessage] = useState<string>("");

	async function handleLogin() {
		try {
			const response = await fetch("http://localhost:8080/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			if (response.ok) {
				const user = await response.json();
				login(user);
				navigate(`/watchlist/users/${user.userId}`);
				setLoginMessage("Login successful");
			} else if (response.status === 401) {
				setLoginMessage("Invalid email or password");
			} else {
				setLoginMessage("Something went wrong. Please try again.");
			}
		} catch (error) {
			console.error("Login error: ", error);
			setLoginMessage("Unable to connect to the server");
		}
	}

	return (
		<Box>
			<Center>
				<Heading
					size="7xl"
					fontFamily="branding"
					color="green"
					paddingTop="50px"
					paddingBottom="30px">
					Login Form
				</Heading>
			</Center>

			<section>
				<LoginForm
					email={email}
					password={password}
					loginMessage={loginMessage}
					onEmailChange={setEmail}
					onPasswordChange={setPassword}
					onSubmit={handleLogin}
				/>
			</section>
		</Box>
	);
}

export default LoginPage;
