import { type CourseSearchFilterDto } from "~/modules/courses/courses.js";

const DEFAULT_SEARCH_COURSE_PAYLOAD: Omit<
	CourseSearchFilterDto,
	"vendorsKey"
> & { vendors: Record<string, boolean> } = {
	search: "",
	vendors: {},
};

const SEARCH_COURSES_DELAY_MS = 700;

export { DEFAULT_SEARCH_COURSE_PAYLOAD, SEARCH_COURSES_DELAY_MS };
