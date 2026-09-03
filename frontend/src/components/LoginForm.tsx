import React, { useState } from "react";
import { Box, Button, Stack, Center, Field, Input } from "@chakra-ui/react";

interface LoginFormProps {
	email: string;
	password: string;
	loginMessage: string;
	onEmailChange: (email: string) => void;
	onPasswordChange: (password: string) => void;
	onSubmit: () => void;
}

interface LoginErrors {
	email?: string;
	password?: string;
}

function LoginForm({
	email,
	password,
	loginMessage,
	onEmailChange,
	onPasswordChange,
	onSubmit,
}: LoginFormProps) {
	const [errors, setErrors] = useState<LoginErrors>({});

	const validateForm = () => {
		const newErrors: LoginErrors = {};

		//validate email
		if (!email.trim()) {
			newErrors.email = "Email is required";
		}

		//validate password
		if (!password.trim()) {
			newErrors.password = "Password is required";
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
							Login
						</Button>
						{loginMessage && <p>{loginMessage}</p>}
					</Stack>
				</form>
			</Box>
		</Center>
	);
}

export default LoginForm;
