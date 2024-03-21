import { PaginationValue } from "~/libs/enums/enums.js";

const checkWhetherAddCourse = (
	totalCoursesCount: number,
	currentPage: number,
): boolean => {
	return (
		totalCoursesCount < PaginationValue.DEFAULT_COUNT ||
		currentPage ===
			Math.ceil(++totalCoursesCount / PaginationValue.DEFAULT_COUNT)
	);
};

export { checkWhetherAddCourse };
