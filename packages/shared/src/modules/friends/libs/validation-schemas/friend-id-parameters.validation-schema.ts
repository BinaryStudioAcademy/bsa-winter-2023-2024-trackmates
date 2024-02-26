import { z } from "zod";

import { FriendValidationMessage } from "../enums/enums.js";

type FriendIdParametersValidationDto = {
	id: z.ZodString;
};

const friendIdParameters = z
	.object<FriendIdParametersValidationDto>({
		id: z.string().trim().regex(/^\d+$/, {
			message: FriendValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { friendIdParameters };
