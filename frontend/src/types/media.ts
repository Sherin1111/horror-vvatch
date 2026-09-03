export interface Media {
	mediaId: number;
	tmdbId: number;
	mediaType: "MOVIE" | "TV_SHOW";
	title: string;
	summary: string | null;
	releaseDate: string | null;
	posterPath: string | null;
	runtimeMinutes: number | null;
	numberOfSeasons: number | null;
	numberOfEpisodes: number | null;
}
