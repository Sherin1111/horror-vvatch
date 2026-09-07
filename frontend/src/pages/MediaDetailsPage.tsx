import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Media } from "@/types/media";
import type { WatchlistEntry } from "@/types/watchlist";
import type { Review } from "@/types/review";
import type { Category } from "@/types/category";
import type { ContentWarning } from "@/types/contentWarning";
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

function MediaDetailsPage() {
	const { mediaId } = useParams<{ mediaId: string }>();
	const [mediaDetails, setMediaDetails] = useState<Media | null>(null);
	const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
	const [watchlistEntryId, setWatchlistEntryId] = useState<number | null>(null);
	const [scareRating, setScareRating] = useState<number | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [reviewText, setReviewText] = useState("");
	const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
	const [isEditingReview, setIsEditingReview] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [contentWarnings, setContentWarnings] = useState<ContentWarning[]>([]);

	const currentUserReview = reviews.find(
		(review) => review.user?.userId === currentUser.userId,
	);

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
				console.error("Error fetching added watchlist:", error);
			}
		};
		fetchWatchlistIds();
	}, [mediaId]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/media/${mediaId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch reviews");
				}

				const data: Review[] = await response.json();
				setReviews(data);
			} catch (error) {
				console.error("Error fetching reviews:", error);
			}
		};
		fetchReviews();
	}, [mediaId]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/categories`);
				if (!response.ok) {
					throw new Error("Failed to fetch horror categories");
				}

				const data: Category[] = await response.json();

				const filteredCategories = data.filter((entry) =>
					entry.media.some((m) => m.mediaId === Number(mediaId)),
				);

				setCategories(filteredCategories);
				console.log(filteredCategories);
			} catch (error) {
				console.error("Error fetching horror categories:", error);
			}
		};
		fetchCategories();
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

	useEffect(() => {
		const fetchContentWarnings = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/content-warnings`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch horror categories");
				}

				const data: ContentWarning[] = await response.json();

				const filteredContentWarning = data.filter((entry) =>
					entry.media.some((m) => m.mediaId === Number(mediaId)),
				);

				setContentWarnings(filteredContentWarning);
				console.log(filteredContentWarning);
			} catch (error) {
				console.error("Error fetching horror categories:", error);
			}
		};
		fetchContentWarnings();
	}, [mediaId]);

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

	const handleReviewSubmit = async () => {
		if (!reviewText.trim()) return;

		try {
			let response;

			if (isEditingReview && currentUserReview) {
				response = await fetch(
					`http://localhost:8080/api/review/${currentUserReview.reviewId}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(reviewText.trim()),
					},
				);
			} else {
				response = await fetch(
					`http://localhost:8080/api/review/users/${currentUser.userId}/media/${mediaId}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(reviewText.trim()),
					},
				);
			}

			if (!response.ok) {
				throw new Error("Failed to submit review");
			}

			const reviewResponse = await fetch(
				`http://localhost:8080/api/review/media/${mediaId}`,
			);

			if (!reviewResponse.ok) {
				throw new Error("Failed to fetch review");
			}

			const updateReviews: Review[] = await reviewResponse.json();

			setReviews(updateReviews);
			setReviewText("");
			setHasSubmittedReview(true);
			setIsEditingReview(false);
		} catch (error) {
			console.error("Error submitting review:", error);
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
					<Box mt="30px">
						<Text
							color="purple"
							fontFamily="accentFont"
							fontSize="2xl"
							mb="10px">
							Add a review
						</Text>
						{!hasSubmittedReview || isEditingReview ? (
							<>
								<Textarea
									placeholder="Write your review..."
									bg="navyLight"
									color="cream"
									border="1px solid"
									borderColor="paleLavender"
									borderRadius="none"
									minH="120px"
									resize="vertical"
									value={reviewText}
									onChange={(e) => setReviewText(e.target.value)}
									_placeholder={{ color: "paleLavender" }}
								/>

								<Button
									mt="12px"
									bg="purple"
									color="cream"
									border="1px solid"
									borderColor="paleLavender"
									_hover={{ bg: "pink" }}
									fontFamily="accentFont"
									onClick={handleReviewSubmit}
									disabled={!reviewText.trim()}>
									{isEditingReview ? "Update Review" : "Submit Review"}
								</Button>

								{isEditingReview && (
									<Button
										mt="12px"
										ml="12px"
										bg="transparent"
										color="pink"
										border="1px solid"
										borderColor="paleLavender"
										onClick={() => {
											setIsEditingReview(false);
											setReviewText("");
										}}>
										Cancel
									</Button>
								)}
							</>
						) : (
							<Button
								mt="12px"
								bg="green"
								color="navy"
								border="1px solid"
								borderColor="paleLavender"
								_hover={{ bg: "pink" }}
								fontFamily="accentFont"
								onClick={() => {
									setIsEditingReview(true);
									setReviewText(currentUserReview?.reviewText ?? "");
								}}>
								Edit Review
							</Button>
						)}
					</Box>
				</Box>

				<Box flex="1" minW="0">
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

					<Box width="100%" maxW="800px">
						<Text
							fontSize="xl"
							lineHeight="1.5"
							textAlign="justify"
							color="paleLavender"
							fontFamily="mainFont"
							pr="20px"
							mt="30px"
							mb="50px">
							{mediaDetails.summary}
						</Text>

						<Box mt="40px">
							<Text
								color="purple"
								fontFamily="accentFont"
								fontSize="2xl"
								mb="6px">
								Horror Category
							</Text>

							<Flex wrap="wrap" gap="10px">
								{categories.map((category) => (
									<Badge
										key={category.categoryId}
										bg="paleLavender"
										color="brand.background"
										fontFamily="mainFont"
										fontWeight="bold"
										borderRadius="none"
										px="15px"
										py="5px">
										{category.categoryName}
									</Badge>
								))}
							</Flex>
						</Box>
						<Box mt="30px" mb="70px">
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
										key={warning.warningId}
										bg="pink"
										color="brand.background"
										fontFamily="mainFont"
										fontWeight="bold"
										borderRadius="none"
										px="15px"
										py="5px">
										{warning.warningName}
									</Badge>
								))}
							</Flex>
						</Box>

						<Box
							mt="50px"
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
								{reviews.map((review) => (
									<Box
										key={review.reviewId}
										borderBottom="1px solid"
										borderColor="green"
										pb="15px">
										<Text
											as="h3"
											fontFamily="accentFont"
											fontSize="2xl"
											color="purple"
											mb="10px">
											{review.user?.username ?? "Unknown user"}
										</Text>
										<Text
											fontFamily="mainFont"
											fontWeight="bold"
											color="paleLavender"
											lineHeight="1.6"
											mb="15px">
											{review.reviewText ?? "No review provided."}
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
