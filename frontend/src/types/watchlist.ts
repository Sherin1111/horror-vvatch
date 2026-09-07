import type { Media } from "./media";
export interface WatchlistEntry {
	user: {
		userId: number;
		username: string;
	};
	media: Media;

	watchlistEntryId: number;
	watchStatus: "NOT_WATCHED" | "IN_PROGRESS" | "WATCHED";
	scareRating: number | null;
	dateAdded: string | null;
	dateCompleted: string | null;
}
