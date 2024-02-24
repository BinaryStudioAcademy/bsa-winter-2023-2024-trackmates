import { type CourseDto } from "~/modules/courses/libs/types/types.js";

type CourseFieldsMapping = Record<
	keyof Pick<
		CourseDto,
		"description" | "image" | "title" | "url" | "vendorCourseId"
	>,
	string
>;

export { type CourseFieldsMapping };
