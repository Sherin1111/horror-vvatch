import { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Center, Heading } from "@chakra-ui/react";

function RegistrationPage() {
	const [username, setUsername] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [registrationMessage, setRegistrationMessage] = useState<string>("");

	async function handleRegistration() {
		try {
			const response = await fetch("http://localhost:8080/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					firstName,
					lastName,
					email,
					passwordHash: password,
				}),
			});
			if (response.ok) {
				setRegistrationMessage("Registration successful");
			} else if (response.status === 400) {
				const errorData = await response.json();
				setRegistrationMessage(errorData.message);
			} else {
				setRegistrationMessage("Something went wrong. Please try again.");
			}
		} catch (error) {
			console.error("Registration error: ", error);
			setRegistrationMessage("Unable to connect to the server");
		}
	}

	return (
		<div>
			<Center>
				<Heading
					size="7xl"
					fontFamily="branding"
					color="green"
					paddingTop="50px"
					paddingBottom="30px">
					Sign Up Form
				</Heading>
			</Center>
			<section>
				<RegistrationForm
					username={username}
					firstName={firstName}
					lastName={lastName}
					email={email}
					password={password}
					registrationMessage={registrationMessage}
					onUsernameChange={setUsername}
					onFirstNameChange={setFirstName}
					onLastNameChange={setLastName}
					onEmailChange={setEmail}
					onPasswordChange={setPassword}
					onSubmit={handleRegistration}
				/>
			</section>
		</div>
	);
}

export default RegistrationPage;
