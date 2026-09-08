import MediaCard from "@/components/MediaCard";
import type { Media } from "@/types/media";
import type { Category } from "@/types/category";
import type { ContentWarning } from "@/types/contentWarning";
import {
	Button,
	Center,
	Grid,
	GridItem,
	Heading,
	Select,
	Stack,
	createListCollection,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

function BrowsePage() {
	const [mediaList, setMediaList] = useState<Media[]>([]);
	const [searchTitle, setSearchTitle] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [contentWarnings, setContentWarnings] = useState<ContentWarning[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedWarning, setSelectedWarning] = useState("");

	const categoryCollection = createListCollection({
		items: [
			{ label: "All categories", value: "" },
			...categories.map((category) => ({
				label: category.categoryName,
				value: String(category.categoryId),
			})),
		],
	});

	const warningCollection = createListCollection({
		items: [
			{ label: "No exclusions", value: "" },
			...contentWarnings.map((warning) => ({
				label: warning.warningName,
				value: String(warning.warningId),
			})),
		],
	});
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

	const filteredMedia = mediaList.filter((media) => {
		const titleMatches =
			searchTitle === "" ||
			media.title.toLowerCase().includes(searchTitle.toLowerCase());

		const categoryMatches =
			selectedCategory === "" ||
			categories.some(
				(category) =>
					category.categoryId === Number(selectedCategory) &&
					category.media.some(
						(categoryMedia) => categoryMedia.mediaId === media.mediaId,
					),
			);

		const warningMatches =
			selectedWarning === "" ||
			!contentWarnings.some(
				(warning) =>
					warning.warningId === Number(selectedWarning) &&
					warning.media.some(
						(warningMedia) => warningMedia.mediaId === media.mediaId,
					),
			);

		return titleMatches && categoryMatches && warningMatches;
	});

	const handleClearFilters = () => {
		setSearchTitle("");
		setSelectedCategory("");
		setSelectedWarning("");
	};

	return (
		<Stack gap="5" padding="10">
			<Center>
				<Heading
					size="7xl"
					fontFamily="branding"
					color="green"
					paddingTop="50px"
					paddingBottom="30px">
					Browse Horror
				</Heading>
			</Center>

			<SearchBar
				value={searchTitle}
				onChange={(value) => setSearchTitle(value)}
			/>

			<Select.Root
				variant="outline"
				collection={categoryCollection}
				value={[selectedCategory]}
				onValueChange={(details) =>
					setSelectedCategory(details.value[0] ?? "")
				}>
				<Select.HiddenSelect />

				<Select.Label fontFamily="mainFont" color="green">
					Horror Category
				</Select.Label>

				<Select.Control>
					<Select.Trigger>
						<Select.ValueText
							color="pink"
							fontFamily="accentFont"
							placeholder="All categories"
						/>
					</Select.Trigger>

					<Select.IndicatorGroup>
						<Select.Indicator />
					</Select.IndicatorGroup>
				</Select.Control>

				<Select.Positioner>
					<Select.Content
						bg="navy"
						color="green"
						fontFamily="mainFont"
						fontWeight="bold">
						<Select.Item item={{ value: "", label: "All categories" }}>
							All categories
							<Select.ItemIndicator />
						</Select.Item>

						{categories.map((category) => (
							<Select.Item
								item={{
									value: String(category.categoryId),
									label: category.categoryName,
								}}
								key={category.categoryId}>
								{category.categoryName}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Select.Root>

			<Select.Root
				variant="outline"
				collection={warningCollection}
				value={[selectedWarning]}
				onValueChange={(details) => setSelectedWarning(details.value[0] ?? "")}>
				<Select.HiddenSelect />

				<Select.Label fontFamily="mainFont" color="green">
					Exclude Content Warning
				</Select.Label>

				<Select.Control>
					<Select.Trigger>
						<Select.ValueText
							color="pink"
							fontFamily="accentFont"
							placeholder="No exclusions"
						/>
					</Select.Trigger>

					<Select.IndicatorGroup>
						<Select.Indicator />
					</Select.IndicatorGroup>
				</Select.Control>

				<Select.Positioner>
					<Select.Content
						bg="navy"
						color="green"
						fontFamily="mainFont"
						fontWeight="bold">
						<Select.Item item={{ value: "", label: "No exclusions" }}>
							No exclusions
							<Select.ItemIndicator />
						</Select.Item>

						{contentWarnings.map((warning) => (
							<Select.Item
								item={{
									value: String(warning.warningId),
									label: warning.warningName,
								}}
								key={warning.warningId}>
								{warning.warningName}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Select.Root>

			<Button
				bg="purple"
				fontFamily="accentFont"
				fontWeight="bold"
				border="1px solid"
				borderColor="paleLavender"
				_hover={{ bg: "pink" }}
				onClick={handleClearFilters}>
				Clear Filters
			</Button>

			{filteredMedia.length > 0 ? (
				<Grid
					templateColumns={{
						base: "1fr",
						md: "repeat(3, 1fr)",
						xl: "repeat(5, 1fr)",
					}}
					gap="6"
					padding="10">
					{filteredMedia.map((item) => (
						<GridItem key={item.mediaId}>
							<MediaCard
								mediaId={item.mediaId}
								title={item.title}
								mediaType={item.mediaType}
								posterPath={item.posterPath}
								releaseDate={item.releaseDate}
							/>
						</GridItem>
					))}
				</Grid>
			) : (
				<p>No horror media found matching your filters.</p>
			)}
		</Stack>
	);
}
export default BrowsePage;
