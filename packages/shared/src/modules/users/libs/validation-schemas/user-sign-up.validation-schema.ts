import { z } from "zod";

import { UserValidationMessage } from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignUp = z
	.object<UserSignUpRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(1, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		password: z.string().trim(),
	})
	.required({
		email: true,
		password: true,
	});

export { userSignUp };
