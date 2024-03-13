const SocketEvent = {
	CHAT_ADD_NEW_MESSAGE: "chat-add-new-message",
	CHAT_JOIN_ROOM: "chat-join-room",
	CHAT_LEAVE_ROOM: "chat-leave-room",
	CONNECTION: "connection",
	NOTIFICATIONS_JOIN_ROOM: "notifications-join-room",
	NOTIFICATIONS_LEAVE_ROOM: "notifications-leave-room",
	UPDATE_NOTIFICATION: "update-notification",
} as const;

export { SocketEvent };
