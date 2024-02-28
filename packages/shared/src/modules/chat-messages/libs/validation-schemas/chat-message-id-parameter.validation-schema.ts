import { z } from "zod";

import {
	ChatMessageValidationMessage,
	ChatMessageValidationRule,
} from "../enums/enums.js";

type ChatMessageIdParameterValidationDto = {
	messageId: z.ZodPipeline<
		z.ZodEffects<z.ZodString, number, string>,
		z.ZodNumber
	>;
};

const chatMessageIdParameter = z
	.object<ChatMessageIdParameterValidationDto>({
		messageId: z
			.string()
			.transform(Number)
			.pipe(
				z
					.number()
					.min(
						ChatMessageValidationRule.MESSAGE_ID_MINIMUM_VALUE,
						ChatMessageValidationMessage.MESSAGE_ID_MINIMUM_VALUE,
					),
			),
	})
	.required();

export { chatMessageIdParameter };
