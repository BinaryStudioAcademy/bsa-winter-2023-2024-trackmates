import { CourseSearchFilterDto } from "~/modules/courses/courses.js";

const DEFAULT_SEARCH_COURSE_PAYLOAD: CourseSearchFilterDto = {
	search: "",
	vendorsKeys: [],
};

const SEARCH_COURSES_DELAY_MS = 500;

export { DEFAULT_SEARCH_COURSE_PAYLOAD, SEARCH_COURSES_DELAY_MS };
