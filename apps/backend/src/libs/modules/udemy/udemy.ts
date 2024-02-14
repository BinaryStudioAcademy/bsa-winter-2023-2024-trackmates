import { config } from "~/libs/modules/config/config.js";

import { http } from "../http/http.js";
import { CourseDetailsField, CourseField } from "./libs/enums/enums.js";
import { Udemy } from "./udemy.module.js";

const udemy = new Udemy({
	baseUrl: config.ENV.UDEMY.URL,
	clientId: config.ENV.UDEMY.CLIENT_ID,
	clientSecret: config.ENV.UDEMY.CLIENT_SECRET,
	fields: {
		course: CourseField,
		courseDetails: CourseDetailsField,
	},
	http,
});

export { udemy };
