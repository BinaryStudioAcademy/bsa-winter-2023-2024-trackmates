import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

const checkIsUserCourse = (
	dto: CourseDto | CourseSearchResponseDto | UserCourseResponseDto,
): dto is UserCourseResponseDto => {
	return "progress" in dto;
};

export { checkIsUserCourse };
