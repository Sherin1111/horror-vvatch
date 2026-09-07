import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Media } from "@/types/media";
import type { WatchlistEntry } from "@/types/watchlist";
import {
	Badge,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Portal,
	Select,
	Text,
	Textarea,
	VStack,
	createListCollection,
} from "@chakra-ui/react";

const scareRatingCollection = createListCollection({
	items: [
		{ label: "👻", value: "1" },
		{ label: "👻👻", value: "2" },
		{ label: "👻👻👻", value: "3" },
		{ label: "👻👻👻👻", value: "4" },
		{ label: "👻👻👻👻👻", value: "5" },
	],
});

const currentUser = {
	userId: 1,
	username: "demoUser",
};

const horrorCategories = [
	"Supernatural",
	"Vampire",
	"Monster",
	"Witches",
	"Horror Comedy",
	"Final Girl",
];

const contentWarnings = [
	"Violence",
	"Blood",
	"Murders",
	"Sexual Content",
	"Psychological Horror",
];

const sampleReviews = [
	{
		user: "buffy321",
		text: "Still one of the best supernatural shows out there. The mix of horror, comedy and genuinely emotional storylines makes it ridiculously watchable. Some episodes still hit just as hard years later.",
		rating: ["👻", "👻", "👻", "👻", "👻"],
	},
	{
		user: "onyx111",
		text: "I can see why the vampires and staked for the characters. Buffy, Willow and Xander feel like such believable group of friends, and the show somehow manages to balance ridiculous monster-of-the-week episodes with surprisingly dark themes.",
		rating: ["👻", "👻", "👻", "👻"],
	},
	{
		user: "tom86",
		text: "A classic for a reason. The early seasons are fun and campy, but the show really grows into something much darker. The supernatural elements are great, but it’s the friendships and character development that make it memorable.",
		rating: ["👻", "👻", "👻"],
	},
];

function MediaDetailsPage() {
	const { mediaId } = useParams<{ mediaId: string }>();
	const [mediaDetails, setMediaDetails] = useState<Media | null>(null);
	const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
	const [watchlistEntryId, setWatchlistEntryId] = useState<number | null>(null);
	const [scareRating, setScareRating] = useState<number | null>(null);

	useEffect(() => {
		if (!mediaId) return;

		const fetchMediaDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/media/${mediaId}`,
				);

				if (!response.ok) {
					throw new Error("Media not found");
				}

				const data: Media = await response.json();
				setMediaDetails(data);
			} catch (error) {
				console.error("Media not found:", error);
			}
		};
		fetchMediaDetails();
	}, [mediaId]);

	useEffect(() => {
		const fetchWatchlistIds = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/watchlist/users/${currentUser.userId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch added watchlist");
				}

				const data: WatchlistEntry[] = await response.json();

				const ids = data
					.filter((entry) => entry.media?.mediaId !== undefined)
					.map((entry) => entry.media.mediaId);

				setWatchlistIds(ids);

				const currentEntry = data.find(
					(entry) => entry.media?.mediaId === Number(mediaId),
				);

				if (currentEntry) {
					setWatchlistEntryId(currentEntry.watchlistEntryId);
					setScareRating(currentEntry.scareRating);
				} else {
					setWatchlistEntryId(null);
					setScareRating(null);
				}
			} catch (error) {
				console.error("Error fetching added watchlist", error);
			}
		};
		fetchWatchlistIds();
	}, [mediaId]);

	const handleAddtoWatchlist = async (mediaIdToAdd: number) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/watchlist/users/${currentUser.userId}/media/${mediaId}`,
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

			const newEntry: WatchlistEntry = await response.json();

			setWatchlistIds((prev) =>
				prev.includes(mediaIdToAdd) ? prev : [...prev, mediaIdToAdd],
			);
			setWatchlistEntryId(newEntry.watchlistEntryId);
			setScareRating(newEntry.scareRating);
		} catch (error) {
			console.error("Error adding to watchlist:", error);
		}
	};

	const handleScareRatingChange = async (newScareRating: number) => {
		if (!watchlistEntryId) return;

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

			setScareRating(newScareRating);
		} catch (error) {
			console.error("Error updating scare rating:", error);
		}
	};

	if (!mediaDetails) {
		return <Box color="green">Loading...</Box>;
	}

	const isInWatchlist = watchlistIds.includes(Number(mediaId));
	const releaseYear = mediaDetails.releaseDate?.slice(0, 4) ?? "Unknown";
	const displayMediaType =
		mediaDetails.mediaType === "TV_SHOW" ? " TV SHOW" : "MOVIE";
	const mediaInfo =
		mediaDetails.mediaType === "MOVIE"
			? `${mediaDetails.runtimeMinutes} min`
			: ` Seasons: ${mediaDetails.numberOfSeasons} ` +
				`Episodes: ${mediaDetails.numberOfEpisodes}`;

	return (
		<Box
			bg="brand.background"
			minH="100vh"
			color="brand.text"
			px="10px"
			py="10px">
			<Heading
				as="h1"
				size="7xl"
				color="purple"
				fontFamily="accentFont"
				pt="20px"
				pb="10px"
				pl="80px">
				{mediaDetails.title}
			</Heading>

			<Text
				color="cream"
				fontFamily="mainFont"
				pl="90px"
				display="flex"
				alignItems="center"
				gap="5px"
				flexWrap="wrap">
				<Badge
					color="green"
					variant="outline"
					border="1px solid"
					borderColor="purple"
					background="transparent">
					{displayMediaType}
				</Badge>

				<Text as="span" marginLeft="5" fontFamily="mainFont" fontWeight="bold">
					{releaseYear}
				</Text>

				<Text as="span" marginLeft="5" color="pink" fontFamily="mainFont">
					{mediaInfo}
				</Text>
			</Text>

			<Flex gap="8" p="10" pl="70px" align="flex-start">
				<Box width="420px" flexShrink={0}>
					<Image
						width="350px"
						height="500px"
						objectFit="cover"
						src={mediaDetails.posterPath ?? undefined}
						alt={mediaDetails.title ?? "Movie poster"}
						border="1px solid"
						borderColor="brand.border"
					/>

					<Box mt="40px">
						<Text
							color="purple"
							fontFamily="accentFont"
							fontSize="2xl"
							mb="6px">
							Horror Category
						</Text>

						<Flex wrap="wrap" gap="10px">
							{horrorCategories.map((category) => (
								<Badge
									key={category}
									bg="paleLavender"
									color="brand.background"
									fontFamily="mainFont"
									fontWeight="bold"
									borderRadius="none"
									px="15px"
									py="5px">
									{category}
								</Badge>
							))}
						</Flex>
					</Box>
					<Box mt="30px">
						<Text
							color="purple"
							fontFamily="accentFont"
							fontSize="2xl"
							mb="6px">
							Content Warning
						</Text>

						<Flex wrap="wrap" gap="10px">
							{contentWarnings.map((warning) => (
								<Badge
									key={warning}
									bg="pink"
									color="brand.background"
									fontFamily="mainFont"
									fontWeight="bold"
									borderRadius="none"
									px="15px"
									py="5px">
									{warning}
								</Badge>
							))}
						</Flex>
					</Box>

					<Box mt="30px">
						<Text
							color="purple"
							fontFamily="accentFont"
							fontSize="2xl"
							mb="10px">
							Add a review
						</Text>

						<Textarea
							placeholder="Write your review..."
							bg="navyLight"
							color="cream"
							border="1px solid"
							borderColor="paleLavender"
							borderRadius="none"
							minH="120px"
							resize="vertical"
							_placeholder={{ color: "paleLavender" }}
						/>
					</Box>
					<Select.Root
						collection={scareRatingCollection}
						value={scareRating !== null ? [String(scareRating)] : []}
						onValueChange={(details) => {
							const nextValue = details.value?.[0];
							const parsed = Number(nextValue);

							if (!Number.isNaN(parsed)) {
								handleScareRatingChange(parsed);
							}
						}}
						size="sm"
						width="150px"
						marginTop="20px">
						<Select.HiddenSelect />

						<Select.Control bg="navy">
							<Select.Trigger>
								<Select.ValueText
									fontFamily="mainFont"
									fontWeight="bold"
									color={scareRating !== null ? "green" : "pink"}
									placeholder="Scare rating"
								/>
							</Select.Trigger>
							<Select.IndicatorGroup>
								<Select.Indicator />
							</Select.IndicatorGroup>
						</Select.Control>
						<Portal>
							<Select.Positioner>
								<Select.Content
									bg="navy"
									color="green"
									fontFamily="mainFont"
									fontWeight="bold">
									{scareRatingCollection.items.map((option) => (
										<Select.Item item={option.value} key={option.value}>
											{option.label}
											<Select.ItemIndicator />
										</Select.Item>
									))}
								</Select.Content>
							</Select.Positioner>
						</Portal>
					</Select.Root>
				</Box>

				<Box flex="1" minW="0">
					<Box width="100%" maxW="800px">
						<Text
							fontSize="xl"
							lineHeight="1.5"
							textAlign="justify"
							color="paleLavender"
							fontFamily="mainFont"
							pr="20px"
							mt="50px"
							mb="50px">
							{mediaDetails.summary}
						</Text>

						<Flex align="center" gap="4" mb="20px">
							<Button
								bg={isInWatchlist ? "green" : "purple"}
								color={isInWatchlist ? "navy" : "cream"}
								border="1px solid"
								borderColor="paleLavender"
								_hover={isInWatchlist ? { bg: "green" } : { bg: "pink" }}
								fontFamily="accentFont"
								disabled={isInWatchlist}
								onClick={() => handleAddtoWatchlist(Number(mediaId))}>
								{isInWatchlist ? "Added" : "Add to Watchlist"}
							</Button>
						</Flex>

						<Box
							mt="250px"
							border="1px solid"
							borderColor="paleLavender"
							bg="navyLight"
							p={4}>
							<Center>
								<Heading
									as="h2"
									size="5xl"
									color="green"
									fontFamily="branding"
									mb="20px">
									Reviews
								</Heading>
							</Center>

							<VStack gap="6px" align="stretch">
								{sampleReviews.map((review) => (
									<Box
										key={review.user}
										borderBottom="1px solid"
										borderColor="green"
										pb="15px">
										<Text
											as="h3"
											fontFamily="accentFont"
											fontSize="2xl"
											color="purple"
											mb="10px">
											{review.user}
										</Text>
										<Text
											fontFamily="mainFont"
											fontWeight="bold"
											color="paleLavender"
											lineHeight="1.6"
											mb="15px">
											{review.text}
										</Text>

										<Text fontFamily="accentFont" color="pink" mb="15px">
											Scare rating: {review.rating.join(" ")}
										</Text>
									</Box>
								))}
							</VStack>
						</Box>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
}
export default MediaDetailsPage;
