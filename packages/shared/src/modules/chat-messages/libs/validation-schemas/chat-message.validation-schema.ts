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
		.min(
			ChatMessageValidationRule.TEXT_MINIMUM_LENGTH,
			ChatMessageValidationMessage.TEXT_MINIMUM_LENGTH,
		)
		.max(
			ChatMessageValidationRule.TEXT_MAXIMUM_LENGTH,
			ChatMessageValidationMessage.TEXT_MAXIMUM_LENGTH,
		),
});

export { chatMessage };
