import { Center, Box, Stack, Field, Input, Button } from "@chakra-ui/react";
import type React from "react";
import { useState } from "react";

interface RegistrationFormProps {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	registrationMessage: string;
	onUsernameChange: (username: string) => void;
	onFirstNameChange: (firstName: string) => void;
	onLastNameChange: (lastName: string) => void;
	onEmailChange: (email: string) => void;
	onPasswordChange: (password: string) => void;
	onSubmit: () => void;
}

interface RegistrationErrors {
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}

const emailPattern = /^\S+@\S+\.\S+$/;

function RegistrationForm({
	username,
	firstName,
	lastName,
	email,
	password,
	registrationMessage,
	onUsernameChange,
	onFirstNameChange,
	onLastNameChange,
	onEmailChange,
	onPasswordChange,
	onSubmit,
}: RegistrationFormProps) {
	const [errors, setErrors] = useState<RegistrationErrors>({});

	const validateForm = () => {
		const newErrors: RegistrationErrors = {};

		if (!username.trim()) {
			newErrors.username = "Username is required";
		} else if (username.trim().length < 5) {
			newErrors.username = "Username must be at least 5 characters";
		}

		if (!firstName.trim()) {
			newErrors.firstName = "First name is required";
		}

		if (!lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}

		if (!email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailPattern.test(email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!password.trim()) {
			newErrors.password = "Password is required";
		} else if (password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (validateForm()) {
			onSubmit();
		}
	}

	return (
		<Center>
			<Box bg="navyLight" width="500px" padding="35px">
				<form onSubmit={handleSubmit}>
					<Stack>
						<Field.Root>
							<Field.Label fontFamily="mainFont" color="paleLavender">
								Username
							</Field.Label>
							<Input
								bg="navy"
								type="text"
								placeholder="Enter your username"
								value={username}
								onChange={(event) => onUsernameChange(event.target.value)}
								name="username"
							/>
							<Field.ErrorText>{errors.username}</Field.ErrorText>
						</Field.Root>

						<Field.Root>
							<Field.Label fontFamily="mainFont" color="paleLavender">
								First Name
							</Field.Label>
							<Input
								bg="navy"
								type="text"
								placeholder="Enter your first name"
								value={firstName}
								onChange={(event) => onFirstNameChange(event.target.value)}
								name="firstName"
							/>
							<Field.ErrorText>{errors.firstName}</Field.ErrorText>
						</Field.Root>

						<Field.Root>
							<Field.Label fontFamily="mainFont" color="paleLavender">
								Last Name
							</Field.Label>
							<Input
								bg="navy"
								type="text"
								placeholder="Enter your last name"
								value={lastName}
								onChange={(event) => onLastNameChange(event.target.value)}
								name="lastName"
							/>
							<Field.ErrorText>{errors.lastName}</Field.ErrorText>
						</Field.Root>

						<Field.Root>
							<Field.Label fontFamily="mainFont" color="paleLavender">
								Email
							</Field.Label>
							<Input
								bg="navy"
								type="text"
								placeholder="Enter your email"
								value={email}
								onChange={(event) => onEmailChange(event.target.value)}
								name="email"
							/>
							<Field.ErrorText>{errors.email}</Field.ErrorText>
						</Field.Root>

						<Field.Root paddingBottom="20px">
							<Field.Label fontFamily="mainFont" color="paleLavender">
								Password
							</Field.Label>
							<Input
								bg="navy"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(event) => onPasswordChange(event.target.value)}
								name="password"
							/>
							<Field.ErrorText>{errors.password}</Field.ErrorText>
						</Field.Root>

						<Button bg="purple" fontFamily="accentFont" type="submit">
							{" "}
							Sign Up
						</Button>
						{registrationMessage && <p>{registrationMessage}</p>}
					</Stack>
				</form>
			</Box>
		</Center>
	);
}

export default RegistrationForm;
