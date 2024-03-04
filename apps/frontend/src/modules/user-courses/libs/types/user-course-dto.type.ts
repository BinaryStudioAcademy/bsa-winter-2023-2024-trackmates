import { type CourseDto } from "~/modules/courses/courses.js";

type UserCourseDto = { progress: number } & CourseDto;

export { type UserCourseDto };
