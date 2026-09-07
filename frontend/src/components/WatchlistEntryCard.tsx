import { Badge, Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";

interface WatchlistEntryCardProps {
	title: string;
	mediaType: "MOVIE" | "TV_SHOW";
	summary: string | null;
	releaseDate: string | null;
	posterPath: string | null;
	runtimeMinutes: number | null;
	numberOfSeasons: number | null;
	numberOfEpisodes: number | null;
	watchStatus: "NOT_WATCHED" | "IN_PROGRESS" | "WATCHED";
	scareRating: number | null;
	dateAdded: string | null;
	dateCompleted: string | null;
}

function WatchlistEntryCard({
	title,
	mediaType,
	summary,
	releaseDate,
	posterPath,
	runtimeMinutes,
	numberOfSeasons,
	numberOfEpisodes,
	watchStatus,
	scareRating,
	dateAdded,
	dateCompleted,
}: WatchlistEntryCardProps) {
	const releaseYear = releaseDate?.slice(0, 4) ?? "Unknown";
	const displayDateAdded = dateAdded?.slice(0, 10) ?? "Unknown";
	const displayDateCompleted = dateCompleted?.slice(0, 10) ?? "Unknown";
	const displayMediaType = mediaType === "TV_SHOW" ? "TV SHOW" : "MOVIE";
	const mediaInfo =
		mediaType === "MOVIE"
			? `${runtimeMinutes} min`
			: ` Seasons: ${numberOfSeasons} ` + `Episodes: ${numberOfEpisodes}`;
	const displayWatchStatus =
		watchStatus === "NOT_WATCHED"
			? "NOT WATCHED"
			: watchStatus === "IN_PROGRESS"
				? "IN PROGRESS"
				: "WATCHED";

	return (
		<Card.Root
			bg="navyLight"
			flexDirection="row"
			overflow="hidden"
			width="1200px"
			marginLeft="50px"
			marginTop="10px"
			marginBottom="30px">
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				margin="30px">
				<Image
					aspectRatio="2 / 3"
					width="350px"
					src={posterPath ?? undefined}
					alt={title ?? "Movie poster"}
				/>
				<Text
					marginTop="12px"
					fontFamily="mainFont"
					color="purple"
					fontWeight="bold">
					<Text color="green">{displayWatchStatus}</Text>
				</Text>
			</Box>
			<Box>
				<Card.Body>
					<Card.Title fontSize="xl" color="purple" fontFamily="accentFont">
						{title}
					</Card.Title>
					<Text color="cream" fontFamily="mainFont">
						<Badge
							color="green"
							variant="outline"
							border="1px solid"
							borderColor="purple"
							background="transparent">
							{displayMediaType}
						</Badge>
						<Text as="span" marginLeft="5" color="cream" fontFamily="mainFont">
							{releaseYear}
						</Text>
						<Text as="span" marginLeft="5" color="pink" fontFamily="mainFont">
							{mediaInfo}
						</Text>
					</Text>
					<Text color="cream" fontFamily="mainFont" marginTop="10px">
						Date adedd:{" "}
						<Text as="span" color="green">
							{" "}
							{displayDateAdded}
						</Text>
						<Text as="span" marginLeft="5">
							Date completed:{" "}
							<Text as="span" color="green">
								{displayDateCompleted}
							</Text>
						</Text>
					</Text>
					<Card.Description
						marginTop="20px"
						lineHeight="1.5"
						textAlign="justify"
						color="paleLavender"
						fontFamily="mainFont"
						paddingRight="20px">
						{summary}
					</Card.Description>
					<Flex
						marginTop="20px"
						justify="space-between"
						align="flex-start"
						gap="6">
						<Flex direction="column" gap="3" flex="1">
							<Box>
								<Text color="purple" fontFamily="accentFont" marginBottom="2">
									Horror Category
								</Text>
								<Flex wrap="wrap" gap="2">
									<Badge
										fontFamily="mainFont"
										bg="paleLavender"
										fontWeight="bold">
										Supernatural
									</Badge>
									<Badge
										fontFamily="mainFont"
										bg="paleLavender"
										fontWeight="bold">
										Vampire
									</Badge>
									<Badge
										fontFamily="mainFont"
										bg="paleLavender"
										fontWeight="bold">
										Monster
									</Badge>
									<Badge
										fontFamily="mainFont"
										bg="paleLavender"
										fontWeight="bold">
										Final Girl
									</Badge>
								</Flex>
							</Box>
							<Box>
								<Text color="purple" fontFamily="accentFont" marginBottom="2">
									Content Warning
								</Text>
								<Flex wrap="wrap" gap="2">
									<Badge bg="pink" fontFamily="mainFont" fontWeight="bold">
										Blood
									</Badge>
									<Badge bg="pink" fontFamily="mainFont" fontWeight="bold">
										Psychological Distress
									</Badge>
									<Badge bg="pink" fontFamily="mainFont" fontWeight="bold">
										Violence
									</Badge>
								</Flex>
							</Box>
						</Flex>

						<Box
							alignSelf="flex-start"
							mt="10"
							mr="30px"
							display="flex"
							flexDirection="column"
							gap="3">
							<Text color="purple" fontFamily="accentFont">
								Scare rating: {scareRating}
							</Text>
							<Button
								bg="purple"
								fontFamily="mainFont"
								fontWeight="bold"
								border="1px solid"
								borderColor="paleLavender"
								_hover={{ bg: "pink" }}>
								Add Review
							</Button>
						</Box>
					</Flex>
				</Card.Body>
				<Card.Footer></Card.Footer>
			</Box>
		</Card.Root>
	);
}

export default WatchlistEntryCard;
