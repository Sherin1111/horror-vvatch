import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { WatchlistEntry } from "@/types/watchlist";
import type { Category } from "@/types/category";
import type { ContentWarning } from "@/types/contentWarning";
import WatchlistEntryCard from "@/components/WatchlistEntryCard";

function WatchlistEntryPage() {
	const userId = 1;
	const [userWatchlist, setUserWatchlist] = useState<WatchlistEntry[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [contentWarnings, setContentWarnings] = useState<ContentWarning[]>([]);
	const pageUsername = userWatchlist[0]?.user.username ?? "User";

	useEffect(() => {
		const fetchUserWatchlist = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/watchlist/users/${userId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch users watchlist entries");
				}
				const data: WatchlistEntry[] = await response.json();
				setUserWatchlist(data);
			} catch (error) {
				console.error("Failed to fetch users watchlist entries", error);
			}
		};
		fetchUserWatchlist();
	}, [userId]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/categories");

				if (!response.ok) {
					throw new Error("Failed to fetch horror categories");
				}

				const data: Category[] = await response.json();

				setCategories(data);
			} catch (error) {
				console.error("Error fetching horror categories:", error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchContentWarnings = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/content-warnings",
				);

				if (!response.ok) {
					throw new Error("Failed to fetch content warnings");
				}

				const data: ContentWarning[] = await response.json();

				setContentWarnings(data);
			} catch (error) {
				console.error("Error fetching content warnings:", error);
			}
		};

		fetchContentWarnings();
	}, []);

	const handleStatusChange = async (
		watchlistEntryId: number,
		newStatus: "NOT_WATCHED" | "IN_PROGRESS" | "WATCHED",
	) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/watchlist/${watchlistEntryId}/status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newStatus),
				},
			);
			if (!response.ok) {
				throw new Error("Failed to update watchlist status");
			}

			const updatedEntry: WatchlistEntry = await response.json();

			setUserWatchlist((previousWatchlist) =>
				previousWatchlist.map((entry) =>
					entry.watchlistEntryId === watchlistEntryId ? updatedEntry : entry,
				),
			);
		} catch (error) {
			console.error("Failed to update watchlist status", error);
		}
	};

	const handleScareRatingChange = async (
		watchlistEntryId: number,
		newScareRating: number,
	) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/watchlist/${watchlistEntryId}/scare-rating`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newScareRating),
				},
			);
			if (!response.ok) {
				throw new Error("Failed to update scare rating");
			}

			const updatedEntry: WatchlistEntry = await response.json();

			setUserWatchlist((previousWatchlist) =>
				previousWatchlist.map((entry) =>
					entry.watchlistEntryId === watchlistEntryId ? updatedEntry : entry,
				),
			);
		} catch (error) {
			console.error("Failed to update scare rating", error);
		}
	};

	return (
		<>
			<Center>
				<Heading
					size="7xl"
					fontFamily="branding"
					color="green"
					paddingTop="50px"
					paddingBottom="30px">
					My Watchlist
				</Heading>
			</Center>
			<Text
				color="pink"
				fontFamily="mainFont"
				fontWeight="bold"
				marginLeft="50px">
				{pageUsername}
			</Text>
			<Flex gap="1" direction="column">
				{userWatchlist.length > 0
					? userWatchlist.map((entry) => {
							const entryCategories = categories.filter((category) =>
								category.media.some(
									(media) => media.mediaId === entry.media.mediaId,
								),
							);

							const entryContentWarnings = contentWarnings.filter((warning) =>
								warning.media.some(
									(media) => media.mediaId === entry.media.mediaId,
								),
							);

							return (
								<Box key={entry.watchlistEntryId}>
									<WatchlistEntryCard
										title={entry.media.title}
										mediaType={entry.media.mediaType}
										summary={entry.media.summary}
										releaseDate={entry.media.releaseDate}
										posterPath={entry.media.posterPath}
										runtimeMinutes={entry.media.runtimeMinutes}
										numberOfEpisodes={entry.media.numberOfEpisodes}
										numberOfSeasons={entry.media.numberOfSeasons}
										watchlistEntryId={entry.watchlistEntryId}
										watchStatus={entry.watchStatus}
										scareRating={entry.scareRating}
										dateAdded={entry.dateAdded}
										dateCompleted={entry.dateCompleted}
										onStatusChange={handleStatusChange}
										onScareRatingChange={handleScareRatingChange}
										categories={entryCategories}
										contentWarnings={entryContentWarnings}
									/>
								</Box>
							);
						})
					: "Unable to load watchlist. Please try again."}
			</Flex>
		</>
	);
}

export default WatchlistEntryPage;
