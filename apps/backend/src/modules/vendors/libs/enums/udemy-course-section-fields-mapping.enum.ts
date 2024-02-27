import { CourseSectionField } from "~/modules/vendors/libs/enums/enums.js";
import { type CourseSectionFieldsMapping } from "~/modules/vendors/libs/types/types.js";

const UdemyCourseSectionFieldsMapping: CourseSectionFieldsMapping = {
	description: CourseSectionField["DESCRIPTION"] as string,
	title: CourseSectionField["TITLE"] as string,
} as const;

export { UdemyCourseSectionFieldsMapping };
