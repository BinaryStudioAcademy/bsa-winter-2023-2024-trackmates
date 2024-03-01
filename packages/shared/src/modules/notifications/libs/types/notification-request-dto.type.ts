import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationStatus } from "../enums/enums.js";

type NotificationRequestDto = {
	message: string;
	receiverUserId: number;
	status: ValueOf<typeof NotificationStatus>;
	userId: number;
};

export { type NotificationRequestDto };
