import { z } from "zod";

import { ChatMessageValidationRule } from "../enums/enums.js";

type ChatMessageValidationDto = {
	message: z.ZodString;
};

const chatMessage = z.object<ChatMessageValidationDto>({
	message: z.string().trim().min(ChatMessageValidationRule.TEXT_MINIMUM_LENGTH),
});

export { chatMessage };
