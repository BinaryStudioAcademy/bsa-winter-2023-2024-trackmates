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
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
			})
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
			.regex(/^(?!.*_(?=@)).*(?=@)/, {
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
			),
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
		password: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIELD_REQUIRE,
			})
			.regex(/^[\w!"#$%&'()*+,-./:;<=>?@[\\\]^`{|}~]*$/, {
				message: UserValidationMessage.PASSWORD_INVALID_FORMAT,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MAXIMUM_LENGTH,
			}),
	})
	.required();

export { userSignUp };
