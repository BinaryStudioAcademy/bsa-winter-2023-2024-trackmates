import { AddCoursePayloadKey } from "~/modules/courses/libs/enums/enums.js";

const DEFAULT_VENDORS_PAYLOAD = {
	[AddCoursePayloadKey.VENDORS.UDEMY]: true,
} as const;

export { DEFAULT_VENDORS_PAYLOAD };
