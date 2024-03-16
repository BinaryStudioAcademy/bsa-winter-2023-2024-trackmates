import { NotificationType } from "~/libs/enums/enums.js";

const notificationTypeToIconName = {
	[NotificationType.NEW_COMMENT]: "comment",
	[NotificationType.NEW_FOLLOWER]: "follower",
	[NotificationType.NEW_LIKE]: "like",
} as const;

export { notificationTypeToIconName };
