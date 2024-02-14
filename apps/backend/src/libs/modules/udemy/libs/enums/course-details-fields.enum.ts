import { CourseFields } from "./course-fields.enum.js";

const CourseDetailsFields: Record<string, string> = {
	...CourseFields,
	DESCRIPTION: "description",
	IMAGE_BIG: "image_750x422",
} as const;

export { CourseDetailsFields };
