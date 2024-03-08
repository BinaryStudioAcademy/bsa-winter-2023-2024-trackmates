const SocketEvent = {
	CHAT_ADD_NEW_MESSAGE: "chat-add-new-message",
	CHAT_JOIN_ROOM: "chat-join-room",
	CHAT_LEAVE_ROOM: "chat-leave-room",
	CONNECTION: "connection",
	NEW_NOTIFICATION: "new-notification",
	NOTIFICATIONS_JOIN_ROOM: "notifications-join-room",
	NOTIFICATIONS_LEAVE_ROOM: "notifications-leave-room",
} as const;

export { SocketEvent };
