import { z } from "zod";

import { UserValidationMessage } from "../enums/enums.js";

type FriendIdParametersValidationDto = {
	id: z.ZodString;
};

const userIdParameters = z
	.object<FriendIdParametersValidationDto>({
		id: z.string().trim().regex(/^\d+$/, {
			message: UserValidationMessage.INVALID_ID,
		}),
	})
	.required();

export { userIdParameters };
