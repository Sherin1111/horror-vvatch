import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import WatchlistEntryPage from "./pages/WatchlistEntryPage";
import BrowsePage from "./pages/BrowsePage";

function App() {
	return (
		<>
			<Navbar />{" "}
			<Box bg="navy" minH="100vh">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/media/:mediaId" element={<MediaDetailsPage />} />
					<Route path="/browse" element={<BrowsePage />} />
					<Route
						path="/watchlist/users/:userId"
						element={<WatchlistEntryPage />}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
				</Routes>
			</Box>
		</>
	);
}

export default App;
