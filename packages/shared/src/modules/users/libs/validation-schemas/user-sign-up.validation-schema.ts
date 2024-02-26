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
				new RegExp(
					`^[a-zA-Z0-9._%+-]{1,${UserValidationRule.EMAIL_LOCAL_PART_MAXIMUM_LENGTH}}(?=@)`,
				),
				{
					message: UserValidationMessage.EMAIL_LOCAL_PART_MAXIMUM_LENGTH,
				},
			)
			.regex(
				new RegExp(
					`(?<=@)[a-zA-Z0-9.-]{1,${UserValidationRule.EMAIL_DOMAIN_PART_MAXIMUM_LENGTH}}$`,
				),
				{
					message: UserValidationMessage.EMAIL_DOMAIN_PART_MAXIMUM_LENGTH,
				},
			)
			.regex(/^[\w.]+(?:[._][\dA-Za-z]+)*(?=@)/, {
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/^(?!.*[._]{2})[\w.]*(?=@)/, {
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/(?<=@)(?!.*[.-]{2})[\d.A-Za-z-]*/, {
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/^[^_][\w.]*(?=@)/, {
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			})
			.regex(/(?<=@)(?!.*['-]{2})[\d.A-Za-z-]*$/, {
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			}),
		firstName: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.min(UserValidationRule.FIRST_NAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIRST_NAME_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH, {
				message: UserValidationMessage.FIRST_NAME_MAXIMUM_LENGTH,
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
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.min(UserValidationRule.LAST_NAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.LAST_NAME_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.LAST_NAME_MAXIMUM_LENGTH, {
				message: UserValidationMessage.LAST_NAME_MAXIMUM_LENGTH,
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
		password: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MAXIMUM_LENGTH,
			})
			.regex(/^[\w!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]{8,26}$/, {
				message: UserValidationMessage.PASSWORD_INVALID_FORMAT,
			}),
	})
	.required();

export { userSignUp };
