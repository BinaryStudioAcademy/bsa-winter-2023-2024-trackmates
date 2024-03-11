import { z } from "zod";

import {
	ChatMessageValidationMessage,
	ChatMessageValidationRule,
} from "../enums/enums.js";

type ChatMessageValidationDto = {
	message: z.ZodString;
};

const chatMessage = z.object<ChatMessageValidationDto>({
	message: z
		.string()
		.trim()
		.max(
			ChatMessageValidationRule.TEXT_MAXIMUM_LENGTH,
			ChatMessageValidationMessage.TEXT_MAXIMUM_LENGTH,
		),
});

export { chatMessage };
