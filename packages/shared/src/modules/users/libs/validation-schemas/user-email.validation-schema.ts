import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userEmail = z
	.string()
	.trim()
	.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
		message: UserValidationMessage.EMAIL_REQUIRE,
	})
	.email({
		message: UserValidationMessage.EMAIL_WRONG,
	});

export { userEmail };
