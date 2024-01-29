import zod from "zod";

import { UserValidationMessage } from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	email: zod.ZodString;
	password: zod.ZodString;
};

const userSignUp = zod
	.object<UserSignUpRequestValidationDto>({
		email: zod
			.string()
			.trim()
			.min(1, {
				message: UserValidationMessage.EMAIL_REQUIRE,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		password: zod.string().trim(),
	})
	.required({
		email: true,
		password: true,
	});

export { userSignUp };
