import { CourseField } from "~/modules/vendors/vendors.js";

import { type CourseFieldsMapping } from "../../../libs/types/types.js";

const UdemyFieldsMapping: CourseFieldsMapping = {
	description: CourseField["DESCRIPTION"] as string,
	image: CourseField["IMAGE"] as string,
	title: CourseField["TITLE"] as string,
	url: CourseField["URL"] as string,
	vendorCourseId: CourseField["ID"] as string,
} as const;

export { UdemyFieldsMapping };
