import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRule,
} from "../../../users/libs/enums/enums.js";

type AuthSendUpdatePasswordLinkRequestValidationDto = {
	email: z.ZodString;
};

const authSendUpdatePasswordLink = z
	.object<AuthSendUpdatePasswordLinkRequestValidationDto>({
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
	})
	.required();

export { authSendUpdatePasswordLink };
