import { ChatMessageValidationRule } from "./chat-message-validation-rule.enum.js";

const ChatMessageValidationMessage = {
	CHAT_ID_MINIMUM_VALUE: `Minimum chatId value – ${ChatMessageValidationRule.CHAT_ID_MINIMUM_VALUE}`,
	MESSAGE_ID_MINIMUM_VALUE: `Minimum messageId value – ${ChatMessageValidationRule.CHAT_ID_MINIMUM_VALUE}`,
	TEXT_MAXIMUM_LENGTH: `Maximum text length – ${ChatMessageValidationRule.TEXT_MAXIMUM_LENGTH}`,
	TEXT_MINIMUM_LENGTH: `Minimum text length – ${ChatMessageValidationRule.TEXT_MINIMUM_LENGTH}`,
};

export { ChatMessageValidationMessage };
