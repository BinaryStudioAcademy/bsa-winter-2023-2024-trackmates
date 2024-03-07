import { type NotificationResponseDto } from "./notification-response-dto.type.js";

type NotificationWithReceiverIdResponseDto = Record<"receiverId", number> &
	Record<"notification", NotificationResponseDto>;

export { type NotificationWithReceiverIdResponseDto };
