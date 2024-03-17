import { type NotificationResponseDto } from "./notification-response-dto.type.js";

type ReadNotificationsResponseDto = {
	items: NotificationResponseDto[];
	unreadNotificationsCount: number;
};

export { type ReadNotificationsResponseDto };
