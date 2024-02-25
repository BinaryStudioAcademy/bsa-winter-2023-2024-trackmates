import { z } from "zod";

import { ChatMessageValidationRule } from "../enums/enums.js";

type ChatMessageValidationDto = {
	message: z.ZodString;
};

const ChatMessage = z.object<ChatMessageValidationDto>({
	message: z
		.string()
		.trim()
		.min(ChatMessageValidationRule.MESSAGE_MINIMUM_LENGTH),
});

export { ChatMessage };
