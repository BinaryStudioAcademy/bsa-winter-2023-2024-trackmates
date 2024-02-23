import { z } from "zod";

import { FriendRequestValidationMessage } from "../enums/enums.js";

type FriendRequestParametersValidationSchema = {
	id: z.ZodString;
};

const friendRequestParameters = z
	.object<FriendRequestParametersValidationSchema>({
		id: z.string().trim().regex(/^\d+$/, {
			message: FriendRequestValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { friendRequestParameters };
