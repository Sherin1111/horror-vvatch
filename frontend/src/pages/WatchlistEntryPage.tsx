import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { WatchlistEntry } from "@/types/watchlist";
import WatchlistEntryCard from "@/components/WatchlistEntryCard";

function WatchlistEntryPage() {
	const userId = 1;
	const [userWatchlist, setUserWatchlist] = useState<WatchlistEntry[]>([]);
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
					? userWatchlist.map((item) => (
							<Box key={item.watchlistEntryId}>
								<WatchlistEntryCard
									title={item.media.title}
									mediaType={item.media.mediaType}
									summary={item.media.summary}
									releaseDate={item.media.releaseDate}
									posterPath={item.media.posterPath}
									runtimeMinutes={item.media.runtimeMinutes}
									numberOfSeasons={item.media.numberOfSeasons}
									numberOfEpisodes={item.media.numberOfEpisodes}
									watchStatus={item.watchStatus}
									scareRating={item.scareRating}
									dateAdded={item.dateAdded}
									dateCompleted={item.dateCompleted}
								/>
							</Box>
						))
					: "Unable to load watchlist. Please try again."}
			</Flex>
		</>
	);
}

export default WatchlistEntryPage;
