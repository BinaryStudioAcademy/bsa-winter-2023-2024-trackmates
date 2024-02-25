import { z } from "zod";

import { FriendValidationMessage } from "../enums/enums.js";

type FriendIdParametersValidationSchema = {
	id: z.ZodString;
};

const friendIdParameters = z
	.object<FriendIdParametersValidationSchema>({
		id: z.string().trim().regex(/^\d+$/, {
			message: FriendValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { friendIdParameters };
