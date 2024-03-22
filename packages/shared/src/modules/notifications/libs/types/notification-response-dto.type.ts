import { type ValueOf } from "../../../../libs/types/types.js";
import { type SubscriptionResponseDto } from "../../../subscriptions/subscriptions.js";
import {
	type NotificationStatus,
	type NotificationType,
} from "../enums/enums.js";

type NotificationResponseDto = {
	createdAt: string;
	id: number;
	message: string;
	receiverUserId: number;
	status: ValueOf<typeof NotificationStatus>;
	type: ValueOf<typeof NotificationType>;
	updatedAt: string;
	userAvatarUrl: null | string;
	userFirstName: string;
	userId: number;
	userLastName: string;
	userSubscription: SubscriptionResponseDto | null;
};

export { type NotificationResponseDto };
