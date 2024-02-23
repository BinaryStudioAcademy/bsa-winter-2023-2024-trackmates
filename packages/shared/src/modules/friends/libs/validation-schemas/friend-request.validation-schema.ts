import { z } from "zod";

import { FriendRequestValidationMessage } from "../enums/enums.js";

type FriendRequestValidationSchema = {
	id: z.ZodNumber;
};

const friendRequest = z
	.object<FriendRequestValidationSchema>({
		id: z.number().int().positive({
			message: FriendRequestValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { friendRequest };
