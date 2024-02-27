import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserProfileRequestValidationDto = {
	firstName: z.ZodString;
	lastName: z.ZodString;
	nickname: z.ZodString;
};

const userProfile = z.object<UserProfileRequestValidationDto>({
	firstName: z
		.string()
		.trim()
		.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.FIRST_NAME_MAXIMUM_LENGTH,
		})
		.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{2,16}(?<!['-])$/, {
			message: UserValidationMessage.FIRST_NAME_INVALID_CHARACTERS,
		}),
	lastName: z
		.string()
		.trim()
		.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.LAST_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.LAST_NAME_MAXIMUM_LENGTH,
		})
		.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{3,25}(?<!['-])$/, {
			message: UserValidationMessage.LAST_NAME_INVALID_CHARACTERS,
		}),
	nickname: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
		})
		.regex(/^[\d_a-z]+$/, {
			message: UserValidationMessage.NICKNAME_INVALID_CHARACTERS,
		})
		.regex(/[a-z]/, {
			message: UserValidationMessage.NICKNAME_AT_LEAST_ONE_LETTER,
		})
		.min(UserValidationRule.NICKNAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.NICKNAME_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.NICKNAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.NICKNAME_MAXIMUM_LENGTH,
		}),
});

export { userProfile };
