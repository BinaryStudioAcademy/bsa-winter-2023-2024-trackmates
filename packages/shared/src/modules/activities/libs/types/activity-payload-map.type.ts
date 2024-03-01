import { type CourseSectionDto } from "../../../course-sections/course-sections.js";
import { type CourseDto } from "../../../courses/courses.js";

//TODO create separate types instead of dto
type ActivityPayloadMap = {
	FINISH_COURSE: CourseDto;
	FINISH_SECTION: CourseSectionDto;
};

export { type ActivityPayloadMap };
