import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserSignInRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignIn = z
	.object<UserSignInRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
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
			.regex(/^(?!.*_(?=@)).*(?=@)/, {
				message: UserValidationMessage.EMAIL_INVALID_FORMAT,
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
			}),
	})
	.required();

export { userSignIn };
