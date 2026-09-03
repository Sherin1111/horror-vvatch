import MediaCard from "@/components/MediaCard";
import SearchBar from "@/components/SearchBar";
import type { Media } from "@/types/media";
import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function HomePage() {
	const [mediaList, setMediaList] = useState<Media[]>([]);
	const [searchMedia, setSearchMedia] = useState("");

	const filterSearch = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/media/search?title=${encodeURIComponent(searchMedia)}`,
			);
			if (!response.ok) {
				throw new Error("Search failed");
			}

			const data: Media[] = await response.json();
			setMediaList(data);
		} catch (error) {
			console.error("Search failed:", error);
		}
	};

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
				onChange={setSearchMedia}
				onSearch={filterSearch}
			/>

			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(3, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap="6"
				padding="10">
				{mediaList.length > 0
					? mediaList.map((item) => (
							<GridItem key={item.mediaId}>
								<MediaCard
									posterPath={item.posterPath}
									title={item.title}
									mediaType={item.mediaType}
									releaseDate={item.releaseDate}
								/>
							</GridItem>
						))
					: "Unable to load media. Please try again."}
			</Grid>
		</>
	);
}

export default HomePage;
