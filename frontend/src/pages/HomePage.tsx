import { useAuth } from "@/context/AuthContext";
import MediaCard from "@/components/MediaCard";
import SearchBar from "@/components/SearchBar";
import type { Media } from "@/types/media";
import type { WatchlistEntry } from "@/types/watchlist";
import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function HomePage() {
	const { user } = useAuth();

	const [mediaList, setMediaList] = useState<Media[]>([]);
	const [searchMedia, setSearchMedia] = useState("");
	const [watchlistIds, setWatchlistIds] = useState<number[]>([]);

	useEffect(() => {
		const fetchMedia = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/media");
				if (!response.ok) {
					throw new Error("Failed to fetch media");
				}
				const data: Media[] = await response.json();
				setMediaList(data);
			} catch (error) {
				console.error("Error fetching media", error);
			}
		};
		fetchMedia();
	}, []);

	useEffect(() => {
		const fetchWatchlistIds = async () => {
			if (!user?.userId) return;

			try {
				const response = await fetch(
					`http://localhost:8080/api/watchlist/users/${user.userId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch added watchlist ID's");
				}

				const data: WatchlistEntry[] = await response.json();

				const ids = data.map((entry) => entry.media.mediaId);
				setWatchlistIds(ids);
			} catch (error) {
				console.error("Error fetching added watchlist ID's", error);
			}
		};
		fetchWatchlistIds();
	}, [user?.userId]);

	const handleAddtoWatchlist = async (mediaId: number, userId?: number) => {
		if (!userId) return;

		try {
			const response = await fetch(
				`http://localhost:8080/api/watchlist/users/${userId}/media/${mediaId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to add to watchlist");
			}

			setWatchlistIds((prev) =>
				prev.includes(mediaId) ? prev : [...prev, mediaId],
			);
		} catch (error) {
			console.error("Error adding to watchlist:", error);
		}
	};

	const filteredMedia = mediaList.filter((media) =>
		media.title.toLowerCase().includes(searchMedia.toLowerCase()),
	);

	return (
		<>
			<Center>
				<Heading
					size="7xl"
					fontFamily="branding"
					color="green"
					paddingTop="50px"
					paddingBottom="30px">
					Horror VVatch
				</Heading>
			</Center>

			<SearchBar
				value={searchMedia}
				onChange={(value) => setSearchMedia(value)}
			/>

			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(3, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap="6"
				padding="10">
				{filteredMedia.length > 0
					? filteredMedia.map((item) => {
							const isInWatchlist = watchlistIds.includes(item.mediaId);

							return (
								<GridItem key={item.mediaId}>
									<MediaCard
										mediaId={item.mediaId}
										posterPath={item.posterPath}
										title={item.title}
										mediaType={item.mediaType}
										releaseDate={item.releaseDate}
										isInWatchlist={isInWatchlist}
										onAddToWatchlist={() =>
											handleAddtoWatchlist(item.mediaId, user?.userId)
										}
									/>
								</GridItem>
							);
						})
					: "Unable to load media. Please try again."}
			</Grid>
		</>
	);
}

export default HomePage;
