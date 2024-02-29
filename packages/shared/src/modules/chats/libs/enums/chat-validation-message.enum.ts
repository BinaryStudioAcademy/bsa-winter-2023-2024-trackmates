import { ChatValidationRule } from "./chat-validation-rule.enum.js";

const ChatValidationMessage = {
	CHAT_ID_MINIMUM_LENGTH: `Minimum chatId value – ${ChatValidationRule.CHAT_ID_MINIMUM_VALUE}`,
	USER_ID_MINIMUM_LENGTH: `Minimum userId value – ${ChatValidationRule.USER_ID_MINIMUM_VALUE}`,
};

export { ChatValidationMessage };
