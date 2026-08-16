import React from "react";

interface LoginFormProps {
	email: string;
	password: string;
	loginMessage: string;
	onEmailChange: (email: string) => void;
	onPasswordChange: (password: string) => void;
	onSubmit: () => void;
}

function LoginForm({
	email,
	password,
	loginMessage,
	onEmailChange,
	onPasswordChange,
	onSubmit,
}: LoginFormProps) {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onSubmit();
	}
	return (
		<div>
			<h2>Login Form</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(event) => onEmailChange(event.target.value)}
						name="email"
					/>
				</label>

				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(event) => onPasswordChange(event.target.value)}
						name="password"
					/>
				</label>
				<input type="submit" value="Login" />
				{loginMessage && <p>{loginMessage}</p>}
			</form>
		</div>
	);
}

export default LoginForm;
