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
			.min(UserValidationRule.CONFIRM_PASSWORD_MINIMUM_LENGTH, {
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
			}),
		firstName: z
			.string()
			.trim()
			.min(UserValidationRule.FIRSTNAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.FIRSTNAME_REQUIRE,
			}),
		lastName: z
			.string()
			.trim()
			.min(UserValidationRule.LASTNAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.LASTNAME_REQUIRE,
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_REQUIRE,
			}),
	})
	.required();

export { userSignUp };
