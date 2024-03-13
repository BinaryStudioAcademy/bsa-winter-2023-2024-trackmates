import { z } from "zod";

import {
	ChatMessageValidationMessage,
	ChatMessageValidationRule,
} from "../enums/enums.js";

type ReadChatMessagesRequestValidation = {
	chatMessageIds: z.ZodArray<z.ZodNumber, z.ArrayCardinality>;
};

const readChatMessagesRequest = z.object<ReadChatMessagesRequestValidation>({
	chatMessageIds: z
		.array(
			z
				.number()
				.min(
					ChatMessageValidationRule.MESSAGE_ID_MINIMUM_VALUE,
					ChatMessageValidationMessage.MESSAGE_ID_MINIMUM_VALUE,
				),
		)
		.min(
			ChatMessageValidationRule.MESSAGE_IDS_ARRAY_MINIMUM_LENGTH,
			ChatMessageValidationMessage.MESSAGE_IDS_ARRAY_MINIMUM_LENGTH,
		),
});

export { readChatMessagesRequest };
