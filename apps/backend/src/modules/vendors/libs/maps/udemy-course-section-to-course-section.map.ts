import { CourseSectionField } from "~/modules/vendors/libs/enums/enums.js";
import { type CourseSectionFieldsMapping } from "~/modules/vendors/libs/types/types.js";

const UdemyCourseSectionToCourseSection: CourseSectionFieldsMapping = {
	title: CourseSectionField["TITLE"] as string,
} as const;

export { UdemyCourseSectionToCourseSection };
