import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	email: z.ZodString;
	firstName: z.ZodString;
	lastName: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(
				/^[\w%+-](([\w%+-]|\.(?=.)){0,33}[\w%+-])?@[\w%+][\w%+-.]{1,33}[\w%+]$/,
				{
					message: UserValidationMessage.EMAIL_INVALID_FORMAT,
				},
			),
		firstName: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.min(UserValidationRule.FIRSTNAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIRSTNAME_MIN_LENGTH,
			})
			.max(UserValidationRule.FIRSTNAME_MAX_LENGTH, {
				message: UserValidationMessage.FIRSTNAME_MAX_LENGTH,
			})
			.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{2,16}(?<!['-])$/, {
				message: UserValidationMessage.FIRSTNAME_INVALID_FORMAT,
			}),
		lastName: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.min(UserValidationRule.LASTNAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.LASTNAME_MIN_LENGTH,
			})
			.max(UserValidationRule.LASTNAME_MAX_LENGTH, {
				message: UserValidationMessage.LASTNAME_MAX_LENGTH,
			})
			.regex(/^(?!['-])(?!.*['-].*['-])['A-Za-z-]{3,25}(?<!['-])$/, {
				message: UserValidationMessage.LASTNAME_INVALID_FORMAT,
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MIN_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAX_LENGTH, {
				message: UserValidationMessage.PASSSWORD_MAX_LENGTH,
			})
			.regex(/^[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]{8,26}$/, {
				message: UserValidationMessage.PASSWORD_INVALID_FORMAT,
			}),
	})
	.required();

export { userSignUp };
