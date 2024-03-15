import { z } from "zod";

import {
	UserValidationMessage,
	UserValidationRule,
} from "../../../users/libs/enums/enums.js";

type AuthUpdatePasswordRequestValidationDto = {
	password: z.ZodString;
	token: z.ZodString;
};

const authUpdatePassword = z
	.object<AuthUpdatePasswordRequestValidationDto>({
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
		token: z.string(),
	})
	.required();

export { authUpdatePassword };
