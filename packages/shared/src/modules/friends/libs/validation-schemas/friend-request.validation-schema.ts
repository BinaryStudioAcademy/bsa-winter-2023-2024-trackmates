import { z } from "zod";

import { FriendRequestValidationMessage } from "../enums/enums.js";

type FriendRequestValidationSchema = {
	id: z.ZodString;
};

const friendRequest = z
	.object<FriendRequestValidationSchema>({
		id: z.string().trim().regex(/^\d+$/, {
			message: FriendRequestValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { friendRequest };
