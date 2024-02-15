import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

type UserProfileRequestValidationDto = {
	fullName: z.ZodString;
};

const userProfile = z
	.object<UserProfileRequestValidationDto>({
		fullName: z.string().trim().min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRE,
		}),
	})
	.required();

export { userProfile };
