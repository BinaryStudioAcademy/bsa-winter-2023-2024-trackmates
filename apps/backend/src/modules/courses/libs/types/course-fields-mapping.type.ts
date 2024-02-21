import { type CourseDto } from "./types.js";

type CourseFieldsMapping = Record<
	keyof Pick<
		CourseDto,
		"description" | "image" | "imageSmall" | "title" | "url" | "vendorCourseId"
	>,
	string
>;

export { type CourseFieldsMapping };
