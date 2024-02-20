import { z } from "zod";

import {
	FriendRequestValidationMessage,
	FriendRequestValidationRule,
} from "../enums/enums.js";

type FriendRequestValidationSchema = {
	id: z.ZodNumber;
};

const friendRequest = z
	.object<FriendRequestValidationSchema>({
		id: z
			.number()
			.int()
			.positive()
			.min(
				FriendRequestValidationRule.MIN_ID,
				FriendRequestValidationMessage.ID_INVALID,
			),
	})
	.required();

export { friendRequest };
