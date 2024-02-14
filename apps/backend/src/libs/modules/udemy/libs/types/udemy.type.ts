type SearchParameters = {
	page?: number;
	pageSize?: number;
	search: string;
};

type Udemy<C, CD, CC> = {
	getCourseCurriculums(id: number): Promise<CC | null>;
	getCourseDetails(id: number): Promise<CD | null>;
	getCourses(parameters: SearchParameters): Promise<C[]>;
};

export { type SearchParameters, type Udemy };
