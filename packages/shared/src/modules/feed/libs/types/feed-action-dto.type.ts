import { type ValueOf } from "../../../../libs/types/value-of.type.js";
import { type CourseSectionDto } from "../../../../modules/course-sections/course-sections.js";
import { type CourseDto } from "../../../../modules/courses/courses.js";
import { type UserAuthResponseDto } from "../../../../modules/users/users.js";
import { type FeedActionType } from "../enums/enums.js";

type FeedActionDto = {
	course: CourseDto;
	courseSection: CourseSectionDto;
	id: number;
	type: ValueOf<typeof FeedActionType>;
	user: UserAuthResponseDto;
};

export { type FeedActionDto };
