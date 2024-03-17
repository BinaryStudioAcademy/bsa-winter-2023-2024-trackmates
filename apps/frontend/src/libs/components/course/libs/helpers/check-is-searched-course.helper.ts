import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

const checkIsSearchedCourse = (
	dto: CourseDto | CourseSearchResponseDto | UserCourseResponseDto,
): dto is CourseSearchResponseDto => {
	return "hasUserCourse" in dto;
};

export { checkIsSearchedCourse };
