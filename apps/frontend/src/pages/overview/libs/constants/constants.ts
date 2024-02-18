import { AddCoursePayloadKey } from "~/modules/courses/courses.js";

const DEFAULT_VENDORS_PAYLOAD = {
	[AddCoursePayloadKey.VENDORS.UDEMY]: true,
} as const;

const DEFAULT_SEARCH_COURSE_PAYLOAD = {
	[AddCoursePayloadKey.SEARCH]: "",
};

export { DEFAULT_SEARCH_COURSE_PAYLOAD, DEFAULT_VENDORS_PAYLOAD };
