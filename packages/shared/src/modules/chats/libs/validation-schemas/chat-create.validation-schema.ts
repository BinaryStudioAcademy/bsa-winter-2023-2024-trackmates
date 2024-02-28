import { z } from "zod";

import { ChatValidationMessage, ChatValidationRule } from "../enums/enums.js";

type ChatCreateValidationDto = {
	userId: z.ZodNumber;
};

const chatMessageCreate = z
	.object<ChatCreateValidationDto>({
		userId: z
			.number()
			.min(
				ChatValidationRule.USER_ID_MINIMUM_VALUE,
				ChatValidationMessage.USER_ID_MINIMUM_LENGTH,
			),
	})
	.required();

export { chatMessageCreate };
