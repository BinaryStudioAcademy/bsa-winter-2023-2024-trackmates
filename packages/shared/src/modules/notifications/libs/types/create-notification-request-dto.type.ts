import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationType } from "../enums/enums.js";

type CreateNotificationRequestDto = {
	actionId: null | number;
	receiverUserId: number;
	type: ValueOf<typeof NotificationType>;
	userId: number;
};

export { type CreateNotificationRequestDto };
