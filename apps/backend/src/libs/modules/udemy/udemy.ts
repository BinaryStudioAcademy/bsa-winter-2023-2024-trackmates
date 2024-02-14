import { config } from "~/libs/modules/config/config.js";

import { http } from "../http/http.js";
import { BasseUdemy } from "./base-udemy.module.js";
import { CourseCurriculumFields } from "./libs/enums/course-curriculum-fields.enum.js";
import { CourseDetailsFields } from "./libs/enums/course-details-fields.enum.js";
import { CourseFields } from "./libs/enums/enums.js";
import { Course, CourseCurriculum, CourseDetails } from "./libs/types/types.js";

const udemy = new BasseUdemy<Course, CourseDetails, CourseCurriculum>({
	baseUrl: config.ENV.UDEMY.URL,
	clientId: config.ENV.UDEMY.CLIENT_ID,
	clientSecret: config.ENV.UDEMY.CLIENT_SECRET,
	fields: {
		course: CourseFields,
		courseCurriculum: CourseCurriculumFields,
		courseDetails: CourseDetailsFields,
	},
	http,
});

export { udemy };
export { type Udemy } from "./libs/types/types.js";
