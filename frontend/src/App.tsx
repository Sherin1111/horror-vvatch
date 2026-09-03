import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<>
			<Navbar />{" "}
			<Box bg="navy" minH="100vh">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
				</Routes>
			</Box>
		</>
	);
}

export default App;
