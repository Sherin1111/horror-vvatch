import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
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
		<div>
			<h1> Horror VVatch</h1>

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
		</div>
	);
}

export default App;
