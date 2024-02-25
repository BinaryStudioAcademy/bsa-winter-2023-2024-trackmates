import { z } from "zod";

import { FriendValidationMessage } from "../enums/enums.js";

type FriendRequestValidationSchema = {
	id: z.ZodNumber;
};

const addFriend = z
	.object<FriendRequestValidationSchema>({
		id: z.number().int().positive({
			message: FriendValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { addFriend };
