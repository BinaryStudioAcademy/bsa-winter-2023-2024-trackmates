import { type CourseDto } from "../../../courses/libs/types/types.js";

type CourseFieldsMapping = Record<
	keyof Pick<
		CourseDto,
		"description" | "image" | "title" | "url" | "vendorCourseId"
	>,
	string
>;

export { type CourseFieldsMapping };
