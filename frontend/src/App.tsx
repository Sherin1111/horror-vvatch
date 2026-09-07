import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import WatchlistEntryPage from "./pages/WatchlistEntryPage";

function App() {
	return (
		<>
			<Navbar />{" "}
			<Box bg="navy" minH="100vh">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
					<Route path="/media/:mediaId" element={<MediaDetailsPage />} />
					<Route
						path="/watchlist/users/:userId"
						element={<WatchlistEntryPage />}
					/>
				</Routes>
			</Box>
		</>
	);
}

export default App;
