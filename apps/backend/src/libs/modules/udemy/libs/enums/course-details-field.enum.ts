import { CourseField } from "./course-field.enum.js";

const CourseDetailsField: Record<string, string> = {
	...CourseField,
	DESCRIPTION: "description",
	IMAGE_BIG: "image_750x422",
} as const;

export { CourseDetailsField };
