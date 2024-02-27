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
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
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
		.regex(/^(?!['-])(?!.*['-]$)['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
		})
		.regex(/^(?!.*['-]{2})['A-Za-z-]*$/, {
			message: UserValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
		})
		.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MAXIMUM_LENGTH,
		}),
	lastName: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
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
		.regex(/^(?!['-])(?!.*['-]$)['A-Za-z-]*$/, {
			message: UserValidationMessage.FIRST_LAST_CHARACTERS_ONLY_LETTERS,
		})
		.regex(/^(?!.*['-]{2})['A-Za-z-]*$/, {
			message: UserValidationMessage.ADJACENT_HYPHEN_APOSTROPHE,
		})
		.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.LAST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MAXIMUM_LENGTH,
		}),
});

export { userProfile };
