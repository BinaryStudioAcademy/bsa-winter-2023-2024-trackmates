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
		.max(UserValidationRule.FIRST_NAME_MAX_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MAX_LENGTH,
		})
		.regex(/^['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^-]*-?[^-]*$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^']*'?[^']*$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^(?!.*['-]{2})['A-Za-z-]*$/, {
			message: UserValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
		})
		.regex(/^(?!['-])(?!.*['-]$)['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
		}),
	lastName: z
		.string()
		.trim()
		.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MIN_LENGTH,
		})
		.max(UserValidationRule.LAST_NAME_MAX_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MAX_LENGTH,
		})
		.regex(/^['A-Za-z-]*$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^-]*-?[^-]*$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^[^']*'?[^']*$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		})
		.regex(/^(?!.*['-]{2})['A-Za-z-]*$/, {
			message: UserValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
		})
		.regex(/^(?!['-])(?!.*['-]$)['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
		}),
});

export { userProfile };
