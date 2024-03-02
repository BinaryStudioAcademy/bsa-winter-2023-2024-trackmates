import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationStatus } from "../enums/enums.js";
import { type NotificationType } from "./notification-type.type.js";

type UpdateNotificationRequestDto = {
	receiverUserId: number;
	status: ValueOf<typeof NotificationStatus>;
	type: NotificationType;
	userId: number;
};

export { type UpdateNotificationRequestDto };
