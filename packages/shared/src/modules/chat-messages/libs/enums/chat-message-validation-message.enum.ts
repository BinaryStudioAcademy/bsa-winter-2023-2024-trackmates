import { ChatMessageValidationRule } from "./chat-message-validation-rule.enum.js";

const ChatMessageValidationMessage = {
	CHAT_ID_MINIMUM_VALUE: `Minimum chatId value – ${ChatMessageValidationRule.CHAT_ID_MINIMUM_VALUE}`,
	MESSAGE_ID_MINIMUM_VALUE: `Minimum messageId value – ${ChatMessageValidationRule.CHAT_ID_MINIMUM_VALUE}`,
	MESSAGES_IDS_ARRAY_MINIMUM_LENGTH:
		"Array of messages IDs should be not empty.",
	TEXT_MAXIMUM_LENGTH: `Maximum text length – ${ChatMessageValidationRule.TEXT_MAXIMUM_LENGTH} characters`,
	TEXT_MINIMUM_LENGTH: `Minimum text length – ${ChatMessageValidationRule.TEXT_MINIMUM_LENGTH} characters`,
};

export { ChatMessageValidationMessage };
