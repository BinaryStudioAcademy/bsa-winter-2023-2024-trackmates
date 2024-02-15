import { CourseInstructorResponseDto } from "../types/types.js";

const CourseInstructorFieldsMapping: Record<
	keyof CourseInstructorResponseDto,
	string
> = {
	image: "image_50x50",
	imageSmall: "image_100x100",
	initials: "initials",
	name: "name",
	url: "url",
} as const;

export { CourseInstructorFieldsMapping };
