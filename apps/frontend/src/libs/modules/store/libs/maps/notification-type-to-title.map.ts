import { NotificationType } from "~/modules/user-notifications/user-notifications.js";

const notificationTypeToTitle = {
	[NotificationType.NEW_COMMENT]: "New comment",
	[NotificationType.NEW_FOLLOWER]: "New follower",
	[NotificationType.NEW_LIKE]: "New like",
};

export { notificationTypeToTitle };
