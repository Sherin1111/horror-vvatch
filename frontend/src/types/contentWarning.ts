import type { Media } from "./media";

export interface ContentWarning {
	media: Media[];

	warningName: string;
	warningId: number;
}
