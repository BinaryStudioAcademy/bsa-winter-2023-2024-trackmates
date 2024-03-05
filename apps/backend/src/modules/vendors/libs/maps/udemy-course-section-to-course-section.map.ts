import { CourseSectionField } from "~/modules/vendors/libs/enums/enums.js";
import { type CourseSectionFieldsMapping } from "~/modules/vendors/libs/types/types.js";

const udemyCourseSectionToCourseSection: CourseSectionFieldsMapping = {
	title: CourseSectionField["TITLE"] as string,
} as const;

export { udemyCourseSectionToCourseSection };
