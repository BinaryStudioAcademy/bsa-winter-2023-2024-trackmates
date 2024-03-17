import { NotificationFilter } from "../../../user-notifications/enums/enums.js";
import { NotificationType } from "../enums/enums.js";

const notificationFilterToType = {
	[NotificationFilter.ALL]: "",
	[NotificationFilter.COMMENTS]: NotificationType.NEW_COMMENT,
	[NotificationFilter.FOLLOWERS]: NotificationType.NEW_FOLLOWER,
	[NotificationFilter.LIKES]: NotificationType.NEW_LIKE,
} as const;

export { notificationFilterToType };
