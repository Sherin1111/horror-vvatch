import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Image,
	Portal,
	Select,
	Text,
	createListCollection,
} from "@chakra-ui/react";

interface WatchlistEntryCardProps {
	title: string;
	mediaType: "MOVIE" | "TV_SHOW";
	summary: string | null;
	releaseDate: string | null;
	posterPath: string | null;
	runtimeMinutes: number | null;
	numberOfSeasons: number | null;
	numberOfEpisodes: number | null;
	watchlistEntryId: number;
	watchStatus: "NOT_WATCHED" | "IN_PROGRESS" | "WATCHED";
	scareRating: number | null;
	dateAdded: string | null;
	dateCompleted: string | null;
	onStatusChange: (
		watchlistEntryId: number,
		newStatus: "NOT_WATCHED" | "IN_PROGRESS" | "WATCHED",
	) => void;
	onScareRatingChange: (
		watchlistEntryId: number,
		newScareRating: number,
	) => void;
}
const statusCollection = createListCollection({
	items: [
		{ label: "Not Watched", value: "NOT_WATCHED" },
		{ label: "In Progress", value: "IN_PROGRESS" },
		{ label: "Watched", value: "WATCHED" },
	],
});

const scareRatingCollection = createListCollection({
	items: [
		{ label: "👻", value: "1" },
		{ label: "👻👻", value: "2" },
		{ label: "👻👻👻", value: "3" },
		{ label: "👻👻👻👻", value: "4" },
		{ label: "👻👻👻👻👻", value: "5" },
	],
});

function WatchlistEntryCard({
	title,
	mediaType,
	summary,
	releaseDate,
	posterPath,
	runtimeMinutes,
	numberOfSeasons,
	numberOfEpisodes,
	watchlistEntryId,
	watchStatus,
	scareRating,
	dateAdded,
	dateCompleted,
	onStatusChange,
	onScareRatingChange,
}: WatchlistEntryCardProps) {
	const releaseYear = releaseDate?.slice(0, 4) ?? "Unknown";
	const displayDateAdded = dateAdded?.slice(0, 10) ?? "Unknown";
	const displayDateCompleted = dateCompleted?.slice(0, 10) ?? "Pending";
	const displayMediaType = mediaType === "TV_SHOW" ? "TV SHOW" : "MOVIE";
	const mediaInfo =
		mediaType === "MOVIE"
			? `${runtimeMinutes} min`
			: ` Seasons: ${numberOfSeasons} ` + `Episodes: ${numberOfEpisodes}`;

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

				<Select.Root
					collection={statusCollection}
					marginTop="20px"
					value={[watchStatus]}
					onValueChange={(details) => {
						const newStatus = details.value?.[0] as
							| "NOT_WATCHED"
							| "IN_PROGRESS"
							| "WATCHED"
							| undefined;

						if (newStatus && newStatus !== watchStatus) {
							onStatusChange(watchlistEntryId, newStatus);
						}
					}}
					size="lg"
					width="150px">
					<Select.HiddenSelect />

					<Select.Control bg="navy">
						<Select.Trigger>
							<Select.ValueText
								fontFamily="mainFont"
								fontWeight="bold"
								color={
									watchStatus === "NOT_WATCHED"
										? "pink"
										: watchStatus === "WATCHED"
											? "green"
											: "yellow"
								}
								placeholder="Select watch status"
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
								color="purple"
								fontFamily="mainFont"
								fontWeight="bold">
								{statusCollection.items.map((option) => (
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
							<Select.Root
								collection={scareRatingCollection}
								marginTop="20px"
								value={scareRating !== null ? [String(scareRating)] : []}
								onValueChange={(details) => {
									const nextValue = details.value?.[0];
									const newScareRating = Number(nextValue);

									if (
										!Number.isNaN(newScareRating) &&
										newScareRating !== scareRating
									) {
										onScareRatingChange(watchlistEntryId, newScareRating);
									}
								}}
								size="lg"
								width="195px">
								<Select.HiddenSelect />

								<Select.Control bg="navy">
									<Select.Trigger>
										<Select.ValueText
											fontFamily="mainFont"
											fontWeight="bold"
											color="pink"
											placeholder="Select scare rating"
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
												<Select.Item
													item={String(option.value)}
													key={option.value}>
													{option.label}
													<Select.ItemIndicator />
												</Select.Item>
											))}
										</Select.Content>
									</Select.Positioner>
								</Portal>
							</Select.Root>

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
