import { type CourseDto } from "~/modules/courses/courses.js";
import { type UserCourseResponseDto } from "~/modules/user-courses/user-courses.js";

const checkIsUserCourse = (
	dto: CourseDto | UserCourseResponseDto,
): dto is UserCourseResponseDto => {
	return "progress" in dto;
};

export { checkIsUserCourse };
