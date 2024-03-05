import { EdxCourseField } from "~/modules/vendors/libs/enums/enums.js";
import {
	type CourseFieldsMapping,
	type EdxCourseResponseDto,
} from "~/modules/vendors/libs/types/types.js";

const EdxCourseFieldsMapping: CourseFieldsMapping = {
	description: EdxCourseField["DESCRIPTION"] as keyof EdxCourseResponseDto,
	image: "",
	title: EdxCourseField["TITLE"] as keyof EdxCourseResponseDto,
	url: "",
	vendorCourseId: EdxCourseField["ID"] as keyof EdxCourseResponseDto,
} as const;

export { EdxCourseFieldsMapping };
