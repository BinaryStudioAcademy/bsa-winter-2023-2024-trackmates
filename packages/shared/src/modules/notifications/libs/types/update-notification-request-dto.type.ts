import { type ValueOf } from "../../../../libs/types/types.js";
import {
	type NotificationStatus,
	type NotificationType,
} from "../enums/enums.js";

type UpdateNotificationRequestDto = {
	actionId: null | number;
	receiverUserId: number;
	status: ValueOf<typeof NotificationStatus>;
	type: ValueOf<typeof NotificationType>;
	userId: number;
};

export { type UpdateNotificationRequestDto };
