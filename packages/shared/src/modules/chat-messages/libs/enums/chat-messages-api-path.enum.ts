const ChatMessagesApiPath = {
	$MESSAGE_ID: "/:messageId",
	READ_CHAT_MESSAGES: "/read-chat-messages",
	ROOT: "/",
} as const;

export { ChatMessagesApiPath };
