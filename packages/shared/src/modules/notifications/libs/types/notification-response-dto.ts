import { type ValueOf } from "../../../../libs/types/types.js";
import { type NotificationStatus } from "../enums/enums.js";

type NotificationResponseDto = {
	createdAt: string;
	id: number;
	message: string;
	sourceUserAvatarUrl: null | string;
	sourceUserFirstName: string;
	sourceUserId: number;
	sourceUserLastName: string;
	status: ValueOf<typeof NotificationStatus>;
	updatedAt: string;
	userId: number;
};

export { type NotificationResponseDto };
