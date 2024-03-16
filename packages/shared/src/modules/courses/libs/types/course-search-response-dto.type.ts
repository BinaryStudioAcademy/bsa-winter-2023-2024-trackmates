import { type CourseDto } from "./course.type.js";

type CourseSearchResponseDto = CourseDto & { isUserHasCourse: boolean };

export { type CourseSearchResponseDto };
