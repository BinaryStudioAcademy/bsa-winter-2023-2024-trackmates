import { CourseField } from "~/modules/vendors/libs/enums/enums.js";
import { type CourseFieldsMapping } from "~/modules/vendors/libs/types/types.js";

const udemyCourseToCourse: CourseFieldsMapping = {
	description: CourseField["DESCRIPTION"] as string,
	image: CourseField["IMAGE"] as string,
	title: CourseField["TITLE"] as string,
	url: CourseField["URL"] as string,
	vendorCourseId: CourseField["ID"] as string,
} as const;

export { udemyCourseToCourse };
