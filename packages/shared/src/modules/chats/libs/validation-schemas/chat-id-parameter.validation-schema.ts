import { z } from "zod";

import { ChatValidationMessage, ChatValidationRule } from "../enums/enums.js";

type ChatIdParameterValidationDto = {
	chatId: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
};

const chatIdParameter = z
	.object<ChatIdParameterValidationDto>({
		chatId: z
			.string()
			.transform(Number)
			.pipe(
				z
					.number()
					.min(
						ChatValidationRule.CHAT_ID_MINIMUM_VALUE,
						ChatValidationMessage.CHAT_ID_MINIMUM_LENGTH,
					),
			),
	})
	.required();

export { chatIdParameter };
