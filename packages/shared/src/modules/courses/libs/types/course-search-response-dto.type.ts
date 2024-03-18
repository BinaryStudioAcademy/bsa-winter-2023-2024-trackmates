import { type CourseDto } from "./course.type.js";

type CourseSearchResponseDto = CourseDto & { hasUserCourse: boolean };

export { type CourseSearchResponseDto };
