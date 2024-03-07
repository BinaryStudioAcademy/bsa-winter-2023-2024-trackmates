import { type NotificationResponseDto } from "./notification-response-dto.type.js";

type NotificationWithReceiverIdResponseDto = {
	notification: NotificationResponseDto;
	receiverId: number;
};

export { type NotificationWithReceiverIdResponseDto };
