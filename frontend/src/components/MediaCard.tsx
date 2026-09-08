import { Link as RouterLink } from "react-router-dom";
import { Badge, Button, Card, Image, Text } from "@chakra-ui/react";
import type React from "react";

interface MediaCardProps {
	mediaId: number;
	title: string;
	mediaType: "MOVIE" | "TV_SHOW";
	posterPath: string | null;
	releaseDate: string | null;
	isInWatchlist?: boolean;
	onAddToWatchlist: (mediaId: number) => void;
	children?: React.ReactNode;
}

function MediaCard({
	mediaId,
	title,
	mediaType,
	posterPath,
	releaseDate,
	isInWatchlist = false,
	onAddToWatchlist,
}: MediaCardProps) {
	const posterImage = posterPath ?? "No Media poster available";
	const releaseYear = releaseDate?.slice(0, 4) ?? "Unknown";
	const displayMediaType = mediaType === "TV_SHOW" ? " TV SHOW" : "MOVIE";

	return (
		<Card.Root>
			<RouterLink to={`/media/${mediaId}`}>
				<Image
					aspectRatio="2 / 3"
					width="100%"
					objectFit="cover"
					src={posterImage}
					alt={title || "Media poster"}
				/>
			</RouterLink>

			<Card.Body bg="navyLight">
				<RouterLink to={`/media/${mediaId}`}>
					<Card.Title fontSize="md" color="pink" fontFamily="accentFont">
						{title}{" "}
						<Text
							as="span"
							marginLeft="2"
							fontSize="sm"
							fontFamily="mainFont"
							color="cream">
							{releaseYear}{" "}
						</Text>
						<Text as="span" marginLeft="2" color="cream" fontFamily="mainFont">
							<Badge
								color="green"
								variant="outline"
								border="1px solid"
								borderColor="purple"
								background="transparent">
								{displayMediaType}
							</Badge>
						</Text>
					</Card.Title>
				</RouterLink>
			</Card.Body>
			<Card.Footer bg="navyLight">
				<Button
					fontFamily="accentFont"
					fontWeight="bold"
					bg={isInWatchlist ? "green" : "purple"}
					color={isInWatchlist ? "navy" : "cream"}
					border="1px solid"
					borderColor="paleLavender"
					_hover={isInWatchlist ? { bg: "green" } : { bg: "pink" }}
					disabled={isInWatchlist}
					onClick={() => onAddToWatchlist(mediaId)}>
					{isInWatchlist ? "Added" : "Add to Watchlist"}
				</Button>
			</Card.Footer>
		</Card.Root>
	);
}

export default MediaCard;
