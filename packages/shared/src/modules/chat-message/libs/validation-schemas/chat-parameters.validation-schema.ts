import { z } from "zod";

import { ChatValidationMessage } from "../enums/enums.js";

type ChatParametersValidationDto = {
	chatId: z.ZodString;
};

const chatParameters = z
	.object<ChatParametersValidationDto>({
		chatId: z
			.string()
			.trim()
			.uuid({ message: ChatValidationMessage.CHAT_ID_INVALID_TYPE }),
	})
	.required();

export { chatParameters };
