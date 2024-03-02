import { type CourseFieldsMapping } from "~/modules/vendors/libs/types/types.js";

import { EdxCourseField } from "./edx-course-field.enum.js";

const EdxCourseFieldsMapping: CourseFieldsMapping = {
	description: EdxCourseField["DESCRIPTION"] as string,
	image: "",
	title: EdxCourseField["TITLE"] as string,
	url: "",
	vendorCourseId: EdxCourseField["ID"] as string,
} as const;

export { EdxCourseFieldsMapping };
