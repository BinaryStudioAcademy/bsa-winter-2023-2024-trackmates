const SocketEvent = {
	CHAT_ADD_NEW_MESSAGE: "chat-add-new-message",
	CHAT_JOIN_ROOM: "chat-join-room",
	CHAT_LEAVE_ROOM: "chat-leave-room",
	CHAT_READ_MESSAGES: "chat-read-messages",
	CONNECTION: "connection",
	NOTIFICATIONS_DELETE: "notifications-delete",
	NOTIFICATIONS_JOIN_ROOM: "notifications-join-room",
	NOTIFICATIONS_LEAVE_ROOM: "notifications-leave-room",
	NOTIFICATIONS_NEW: "notifications-new",
	NOTIFICATIONS_READ: "notifications-read",
} as const;

export { SocketEvent };
