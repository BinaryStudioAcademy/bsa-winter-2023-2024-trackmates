const Prompt = {
	SORT_COURSES:
		"Given a list of courses in JSON format. Analyze these courses by all fields. Return a sorted list of courses based on their overall quality and interest level, from the most recommended courses to the least. The answer should be without any explanation in the format: [index]. The index starts with 0. For example: the input data to analyze is [{0}, {1}, {2}]. After analyzing, the output should be like: [1, 2, 0].",
} as const;

export { Prompt };
