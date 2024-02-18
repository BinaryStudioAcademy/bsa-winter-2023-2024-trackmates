const Prompt = {
	SORT_COURSES_BY_RECOMMENDATIONS:
		"I am sending you a list of courses in JSON format. Analyze these courses by all fields, except 'id'. Return a sorted list of courses based on their overall quality and interest level, from the most recommended courses to the least. The answer should be without any explanation in the format: [index]. The index starts with 0. For example: [0, 2, 1].",
} as const;

export { Prompt };
