import { createContext, useContext, useState, type ReactNode } from "react";

// Information that represents the user
interface User {
	userId: number;
	username: string;
}

// What the authentication makes available to the rest of the app
interface AuthContextType {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

//  Creates the authentication context that will eventually contain AuthContextType once AuthProvider supplies one
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider owns the actual state
function AuthProvider({ children }: { children: ReactNode }) {
	// Reads localStorage when the state is intially created
	const [user, setUser] = useState<User | null>(() => {
		const savedUser = localStorage.getItem("user");

		return savedUser ? JSON.parse(savedUser) : null;
	});

	// The bridge between backend login and the frontend logged-in state
	const login = (loggedInUser: User) => {
		setUser(loggedInUser);
		localStorage.setItem("user", JSON.stringify(loggedInUser));
	};

	// Logged out function
	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		// Where the Contex becomes available; everything inside this can access user, login, and logout
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	// Receives the Context value
	const context = useContext(AuthContext);

	// Context could be AuthContextType or underfined
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export { AuthProvider, useAuth };
