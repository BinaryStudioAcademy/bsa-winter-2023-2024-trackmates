import { type CourseSectionDto } from "../../../course-sections/course-sections.js";
import { type CourseDto } from "../../../courses/courses.js";

type ActivityActionMap = {
	FINISH_COURSE: CourseDto;
	FINISH_SECTION: CourseSectionDto;
};

export { type ActivityActionMap };
