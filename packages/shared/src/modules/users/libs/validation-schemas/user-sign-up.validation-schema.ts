import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	confirmPassword: z.ZodString;
	email: z.ZodString;
	firstName: z.ZodString;
	lastName: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		confirmPassword: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.CONFIRM_PASSWORD_REQUIRE,
			}),
		email: z
			.string()
			.trim()
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			})
			.regex(
				/^(?=.{1,35}@)[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/,
				{
					message: UserValidationMessage.EMAIL_INVALID_FORMAT,
				},
			),
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
			}),
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
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_SHORT,
			})
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()-_`{|}~])[\d!"#$%&'()-_`a-z{|}~]{8,}$/,
				{
					message: UserValidationMessage.PASSWORD_WEAK,
				},
			),
	})
	.required()
	.refine((data) => data.password === data.confirmPassword, {
		message: UserValidationMessage.PASSWORDS_NOT_MATCH,
		path: ["confirmPassword"],
	});

export { userSignUp };
