const SocketEvent = {
	CHAT_ADD_NEW_MESSAGE: "chat-add-new-message",
	CHAT_JOIN_ROOM: "chat-join-room",
	CHAT_LEAVE_ROOM: "chat-leave-room",
	CONNECTION: "connection",
} as const;

export { SocketEvent };
