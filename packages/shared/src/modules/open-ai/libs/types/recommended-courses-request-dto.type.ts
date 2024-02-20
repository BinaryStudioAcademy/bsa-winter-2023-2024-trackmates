import { type CourseSearchRequestDto } from "../../../courses/courses.js";

type RecommendedCoursesRequestDto = CourseSearchRequestDto & { count?: number };

export { type RecommendedCoursesRequestDto };
