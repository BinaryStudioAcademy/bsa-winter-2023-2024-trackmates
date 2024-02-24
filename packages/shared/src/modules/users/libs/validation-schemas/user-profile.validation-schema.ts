import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserProfileRequestValidationDto = {
	firstName: z.ZodString;
	lastName: z.ZodString;
};

const userProfile = z.object<UserProfileRequestValidationDto>({
	firstName: z
		.string()
		.trim()
		.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MIN_LENGTH,
		})
		.max(UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MAX_LENGTH,
		})
		.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{2,16}(?<!['-])$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		}),
	lastName: z
		.string()
		.trim()
		.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MIN_LENGTH,
		})
		.max(UserValidationRule.LAST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MAX_LENGTH,
		})
		.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{3,25}(?<!['-])$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		}),
});

export { userProfile };
