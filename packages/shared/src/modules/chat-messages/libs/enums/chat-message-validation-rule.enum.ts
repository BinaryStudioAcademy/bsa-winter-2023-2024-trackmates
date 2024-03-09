const ChatMessageValidationRule = {
	CHAT_ID_MINIMUM_VALUE: 1,
	MESSAGE_ID_MINIMUM_VALUE: 1,
	MESSAGES_IDS_ARRAY_MINIMUM_LENGTH: 1,
	TEXT_MAXIMUM_LENGTH: 512,
	TEXT_MINIMUM_LENGTH: 1,
} as const;

export { ChatMessageValidationRule };
