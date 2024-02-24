import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserProfileRequestValidationDto = {
	firstName?: z.ZodOptional<z.ZodString>;
	lastName?: z.ZodOptional<z.ZodString>;
};

const userProfile = z.object<UserProfileRequestValidationDto>({
	firstName: z
		.string()
		.trim()
		.min(UserValidationRule.FIRSTNAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIRSTNAME_MIN_LENGTH,
		})
		.max(UserValidationRule.FIRSTNAME_MAX_LENGTH, {
			message: UserValidationMessage.FIRSTNAME_MAX_LENGTH,
		})
		.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{2,16}(?<!['-])$/, {
			message: UserValidationMessage.FIRSTNAME_INVALID_FORMAT,
		})
		.optional(),
	lastName: z
		.string()
		.trim()
		.min(UserValidationRule.LASTNAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.LASTNAME_MIN_LENGTH,
		})
		.max(UserValidationRule.LASTNAME_MAX_LENGTH, {
			message: UserValidationMessage.LASTNAME_MAX_LENGTH,
		})
		.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{3,25}(?<!['-])$/, {
			message: UserValidationMessage.LASTNAME_INVALID_FORMAT,
		})
		.optional(),
});

export { userProfile };
