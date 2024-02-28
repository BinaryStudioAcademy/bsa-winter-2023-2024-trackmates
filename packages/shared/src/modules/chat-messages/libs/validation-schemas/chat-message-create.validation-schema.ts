import { z } from "zod";

import {
	ChatMessageValidationMessage,
	ChatMessageValidationRule,
} from "../enums/enums.js";

type ChatMessageCreateValidationDto = {
	chatId: z.ZodNumber;
	text: z.ZodString;
};

const chatMessageCreate = z
	.object<ChatMessageCreateValidationDto>({
		chatId: z
			.number()
			.min(
				ChatMessageValidationRule.CHAT_ID_MINIMUM_VALUE,
				ChatMessageValidationMessage.CHAT_ID_MINIMUM_VALUE,
			),
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

export { chatMessageCreate };
