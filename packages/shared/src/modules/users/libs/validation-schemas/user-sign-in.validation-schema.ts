import { z } from "zod";

import { userEmail } from "./user-email.validation-schema.js";
import { userPassword } from "./user-password.validation-schema.js";

type UserSignInRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const userSignIn = z
	.object<UserSignInRequestValidationDto>({
		email: userEmail,
		password: userPassword,
	})
	.required();

export { userSignIn };
