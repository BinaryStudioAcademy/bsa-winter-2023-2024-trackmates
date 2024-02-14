const CourseFields: Record<string, string> = {
	AVG_RATING: "avg_rating",
	CATEGORY: "primary_category",
	HEADLINE: "headline",
	ID: "id",
	IMAGE_SMALL: "image_240x135",
	INSTRUCTORS: "visible_instructors",
	IS_PAID: "is_paid",
	LEVEL: "instructional_level_simple", // values: 'All Levels', 'Beginner', ...
	NUM_LECTURES: "num_lectures",
	NUM_REVIEWS: "num_reviews",
	PRICE: "price",
	SUB_CATEGORY: "primary_subcategory",
	TITLE: "title",
	URL: "url",
} as const;

export { CourseFields };
