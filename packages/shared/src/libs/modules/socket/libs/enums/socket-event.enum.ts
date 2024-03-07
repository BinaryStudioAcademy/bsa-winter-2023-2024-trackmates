const SocketEvent = {
	CHAT_ADD_NEW_MESSAGE: "chat-add-new-message",
	CHAT_JOIN_ROOM: "chat-join-room",
	CHAT_LEAVE_ROOM: "chat-leave-room",
	CONNECTION: "connection",
	NOTIFICATION_JOIN_ROOM: "notification-join-room",
	NOTIFICATION_LEAVE_ROOM: "notification-leave-room",
	NOTIFICATION_NEW_FOLLOWER: "notification-new-follower",
} as const;

export { SocketEvent };
