import { z } from "zod";

import {
	GroupValidationErrorMessage,
	GroupValidationRule,
} from "../enums/enums.js";

const groupRequestBody = z
	.object({
		key: z
			.string()
			.min(GroupValidationRule.FIELD_MINIMUM_LENGTH, {
				message: GroupValidationErrorMessage.FIELD_REQUIRE,
			})
			.regex(/[A-Za-z]/, {
				message: GroupValidationErrorMessage.AT_LEAST_ONE_LETTER,
			})
			.regex(/^[\da-z-]*$/, {
				message: GroupValidationErrorMessage.GROUP_KEY_INVALID_CHARACTERS,
			})
			.min(GroupValidationRule.GROUP_KEY_MINIMUM_LENGTH, {
				message: GroupValidationErrorMessage.GROUP_KEY_MINIMUM_LENGTH,
			})
			.max(GroupValidationRule.GROUP_KEY_MAXIMUM_LENGTH, {
				message: GroupValidationErrorMessage.GROUP_KEY_MAXIMUM_LENGTH,
			}),
		name: z
			.string()
			.min(GroupValidationRule.FIELD_MINIMUM_LENGTH, {
				message: GroupValidationErrorMessage.FIELD_REQUIRE,
			})
			.regex(/[A-Za-z]/, {
				message: GroupValidationErrorMessage.AT_LEAST_ONE_LETTER,
			})
			.regex(/^[\d A-Za-z-]*$/, {
				message: GroupValidationErrorMessage.GROUP_NAME_INVALID_CHARACTERS,
			})
			.min(GroupValidationRule.GROUP_NAME_MINIMUM_LENGTH, {
				message: GroupValidationErrorMessage.GROUP_NAME_MINIMUM_LENGTH,
			})
			.max(GroupValidationRule.GROUP_NAME_MAXIMUM_LENGTH, {
				message: GroupValidationErrorMessage.GROUP_NAME_MAXIMUM_LENGTH,
			}),
	})
	.required();

export { groupRequestBody };
