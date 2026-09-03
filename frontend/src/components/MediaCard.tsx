import { Badge, Button, Card, Image, Text } from "@chakra-ui/react";

interface MediaCardProps {
	title: string;
	mediaType: "MOVIE" | "TV_SHOW";
	posterPath: string | null;
	releaseDate: string | null;
}

function MediaCard({
	title,
	mediaType,
	posterPath,

	releaseDate,
}: MediaCardProps) {
	const posterImage = posterPath ?? "No Media poster available";
	const releaseYear = releaseDate?.slice(0, 4) ?? "Unknown";
	const displayMediaType = mediaType === "TV_SHOW" ? " TV SHOW" : "MOVIE";
	return (
		<Card.Root>
			<Image
				aspectRatio="2 / 3"
				width="100%"
				objectFit="cover"
				src={posterImage}
				alt={title || "Media poster"}
			/>
			<Card.Body bg="navyLight">
				<Card.Title fontSize="md" color="paleLavender" fontFamily="accentFont">
					{title}{" "}
					<Text
						as="span"
						marginLeft="2"
						fontSize="sm"
						fontFamily="mainFont"
						color="cream">
						{releaseYear}
					</Text>
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
				</Text>
			</Card.Body>
			<Card.Footer bg="navyLight">
				<Button fontFamily="accentFont" bg="purple">
					Add to Watchlist
				</Button>
			</Card.Footer>
		</Card.Root>
	);
}

export default MediaCard;
