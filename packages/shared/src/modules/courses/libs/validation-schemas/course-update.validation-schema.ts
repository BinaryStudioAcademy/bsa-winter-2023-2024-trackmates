import { z } from "zod";

import {
	CourseValidationMessage,
	CourseValidationRule,
} from "../enums/enums.js";

type CourseUpdateValidationSchemaDto = {
	title: z.ZodString;
};

const courseUpdate = z
	.object<CourseUpdateValidationSchemaDto>({
		title: z
			.string()
			.trim()
			.min(
				CourseValidationRule.TITLE_MINIMUM_LENGTH,
				CourseValidationMessage.TITLE_MINIMUM_LENGTH,
			),
	})
	.required();

export { courseUpdate };
