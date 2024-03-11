const ChatsApiPath = {
	$CHAT_ID: "/:chatId",
	GET_UNREAD_MESSAGE_COUNTER: "/get-unread-message-counter",
	ROOT: "/",
} as const;

export { ChatsApiPath };
