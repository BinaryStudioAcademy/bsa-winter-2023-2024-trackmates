import { z } from "zod";

import { FriendValidationMessage } from "../enums/enums.js";

type FriendRequestValidationDto = {
	id: z.ZodNumber;
};

const addFriend = z
	.object<FriendRequestValidationDto>({
		id: z.number().int().positive({
			message: FriendValidationMessage.ID_INVALID,
		}),
	})
	.required();

export { addFriend };
