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
		<div>
			<h2>Registration Form</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Username
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(event) => onUsernameChange(event.target.value)}
						name="username"
					/>
					{errors.username && <p>{errors.username}</p>}
				</label>
				<label>
					First Name
					<input
						type="text"
						placeholder="First name"
						value={firstName}
						onChange={(event) => onFirstNameChange(event.target.value)}
						name="firstName"
					/>
					{errors.firstName && <p>{errors.firstName}</p>}
				</label>
				<label>
					Last Name
					<input
						type="text"
						placeholder="Last name"
						value={lastName}
						onChange={(event) => onLastNameChange(event.target.value)}
						name="lastName"
					/>
					{errors.lastName && <p>{errors.lastName}</p>}
				</label>
				<label>
					Email
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(event) => onEmailChange(event.target.value)}
						name="email"
					/>
					{errors.email && <p>{errors.email}</p>}
				</label>
				<label>
					Password
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(event) => onPasswordChange(event.target.value)}
						name="password"
					/>
					{errors.password && <p>{errors.password}</p>}
				</label>
				<input type="submit" />
				{registrationMessage && <p>{registrationMessage}</p>}
			</form>
		</div>
	);
}

export default RegistrationForm;
