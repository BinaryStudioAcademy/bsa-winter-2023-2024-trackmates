import { type CourseSectionDto } from "~/modules/course-sections/course-sections.js";

import { type CourseSectionFieldForMap } from "./course-section-field-for-map.type.js";

type CourseSectionFieldsMapping = Record<
	keyof Pick<CourseSectionDto, CourseSectionFieldForMap>,
	string
>;

export { type CourseSectionFieldsMapping };
