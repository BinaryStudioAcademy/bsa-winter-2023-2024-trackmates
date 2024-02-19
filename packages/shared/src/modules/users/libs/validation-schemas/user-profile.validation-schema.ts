import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserProfileRequestValidationDto = {
	firstName: z.ZodString;
	lastName: z.ZodString;
};

const userProfile = z
	.object<UserProfileRequestValidationDto>({
		firstName: z.string().trim().min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
		}),
		lastName: z.string().trim().min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
		}),
	})
	.required();

export { userProfile };
