import { CourseField } from "~/modules/vendors/vendors.js";

import { CourseDto } from "../types/types.js";

const UdemyFieldsMapping: Record<
	keyof Omit<CourseDto, "id" | "vendor">,
	string
> = {
	description: CourseField["DESCRIPTION"] as string,
	image: CourseField["IMAGE"] as string,
	imageSmall: CourseField["IMAGE_SMALL"] as string,
	title: CourseField["TITLE"] as string,
	url: CourseField["URL"] as string,
	vendorCourseId: CourseField["ID"] as string,
} as const;

export { UdemyFieldsMapping };
