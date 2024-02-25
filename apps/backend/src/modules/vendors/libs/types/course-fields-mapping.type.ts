import { type CourseDto } from "~/modules/courses/libs/types/types.js";

import { type CourseFieldForMap } from "./course-field-for-map.type.js";

type CourseFieldsMapping = Record<
	keyof Pick<CourseDto, CourseFieldForMap>,
	string
>;

export { type CourseFieldsMapping };
