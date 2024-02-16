const CourseField: Record<string, string> = {
	AVG_RATING: "avg_rating",
	CATEGORY: "primary_category",
	DESCRIPTION: "description",
	HEADLINE: "headline",
	ID: "id",
	IMAGE_SMALL: "image_240x135",
	INSTRUCTORS: "visible_instructors",
	IS_PAID: "is_paid",
	LEVEL: "instructional_level_simple",
	NUM_LECTURES: "num_lectures",
	NUM_REVIEWS: "num_reviews",
	PRICE: "price",
	SUB_CATEGORY: "primary_subcategory",
	TITLE: "title",
	URL: "url",
} as const;

export { CourseField };
