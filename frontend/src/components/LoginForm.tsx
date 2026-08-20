import React, { useState } from "react";

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
		<div>
			<h2>Login Form</h2>

			<form onSubmit={handleSubmit}>
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
				<button type="submit">Login</button>
				{loginMessage && <p>{loginMessage}</p>}
			</form>
		</div>
	);
}

export default LoginForm;
