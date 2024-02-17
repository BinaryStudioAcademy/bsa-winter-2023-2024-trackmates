import { CourseField } from "~/libs/modules/udemy/udemy.js";

import { CourseDto } from "../types/types.js";

const CourseFieldsMapping: Record<keyof Omit<CourseDto, "vendor">, string> = {
	description: CourseField["DESCRIPTION"] as string,
	id: CourseField["ID"] as string,
	image: CourseField["IMAGE"] as string,
	imageSmall: CourseField["IMAGE_SMALL"] as string,
	title: CourseField["TITLE"] as string,
	url: CourseField["URL"] as string,
} as const;

export { CourseFieldsMapping };
