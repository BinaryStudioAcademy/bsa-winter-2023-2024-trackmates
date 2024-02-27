import { type CourseSearchFilterDto } from "../types/types.js";

const DEFAULT_SEARCH_MY_COURSES_PAYLOAD: Omit<
	CourseSearchFilterDto,
	"vendorsKey"
> = {
	search: "",
};

export { DEFAULT_SEARCH_MY_COURSES_PAYLOAD };
