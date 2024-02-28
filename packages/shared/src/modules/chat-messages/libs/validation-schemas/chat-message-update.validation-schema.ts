import { z } from "zod";

import {
	ChatMessageValidationMessage,
	ChatMessageValidationRule,
} from "../enums/enums.js";

type ChatMessageUpdateValidationDto = {
	text: z.ZodString;
};

const chatMessageUpdate = z
	.object<ChatMessageUpdateValidationDto>({
		text: z
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
	})
	.required();

export { chatMessageUpdate };
