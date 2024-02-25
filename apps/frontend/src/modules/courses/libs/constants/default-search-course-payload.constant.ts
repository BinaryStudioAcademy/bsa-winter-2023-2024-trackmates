import { type CourseSearchFilterDto } from "../types/types.js";

const DEFAULT_SEARCH_COURSE_PAYLOAD: Omit<
	CourseSearchFilterDto,
	"vendorsKeys"
> & { vendors: Record<string, boolean> } = {
	search: "",
	vendors: {},
};

export { DEFAULT_SEARCH_COURSE_PAYLOAD };
