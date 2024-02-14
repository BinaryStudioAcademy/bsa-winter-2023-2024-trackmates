const CourseCurriculumFields: Record<string, string> = {
	CLASS: "_class", // values: 'lecture', 'chapter', 'quiz'
	CONTENT_SUMMARY: "content_summary",
	DESCRIPTION: "description",
	ID: "id",
	SORT_ORDER: "sort_order", // number through the all items, should be sorted by DESC
	TITLE: "title",
	// url, curriculum_url, preview_url ?
} as const;

export { CourseCurriculumFields };
