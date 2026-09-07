export interface Review {
	user: {
		userId: number;
		username: string;
	};

	reviewId: number;
	reviewText: string | null;
	createdAt: string | null;
	updatedAt: string | null;
}
