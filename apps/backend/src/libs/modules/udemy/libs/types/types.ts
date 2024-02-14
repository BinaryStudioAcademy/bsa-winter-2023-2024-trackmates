import { ValueOf } from "shared";

import {
	CourseCurriculumFields,
	CourseDetailsFields,
	CourseFields,
} from "../enums/enums.js";

// TODO how to do it better?
type CourseCurriculum = {
	[key: ValueOf<typeof CourseCurriculumFields>]: unknown;
};
type CourseDetails = {
	[key: ValueOf<typeof CourseDetailsFields>]: unknown;
};
type Course = {
	[key: ValueOf<typeof CourseFields>]: unknown;
};

export { type Course, type CourseCurriculum, type CourseDetails };
export { type Udemy } from "./udemy.type.js";
