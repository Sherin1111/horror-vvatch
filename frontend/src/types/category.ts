import type { Media } from "./media";

export interface Category {
	media: Media[];

	categoryName: string;
	categoryId: number;
}
