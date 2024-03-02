import { type NotificationType } from "./notification-type.type.js";

type CreateNotificationRequestDto = {
	receiverUserId: number;
	type: NotificationType;
	userId: number;
};

export { type CreateNotificationRequestDto };
