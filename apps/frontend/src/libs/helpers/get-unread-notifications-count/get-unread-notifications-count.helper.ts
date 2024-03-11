import { NotificationStatus } from "~/libs/enums/enums.js";
import { type NotificationResponseDto } from "~/modules/user-notifications/user-notifications.js";

const getUnreadNotificationsCount = (
	notifications: NotificationResponseDto[],
): number => {
	return notifications.filter((notification) => {
		return notification.status === NotificationStatus.UNREAD;
	}).length;
};

export { getUnreadNotificationsCount };
