import { type CourseSearchFilterDto } from "~/modules/courses/courses.js";

const DEFAULT_SEARCH_COURSE_PAYLOAD: Omit<
	CourseSearchFilterDto,
	"vendorsKey"
> & { vendors: Record<string, boolean> } = {
	search: "",
	vendors: {},
};

export { DEFAULT_SEARCH_COURSE_PAYLOAD };
export { UDEMY_KEY } from "./udemy-key.constant.js";
export { SEARCH_COURSES_DELAY_MS } from "~/modules/courses/courses.js";
