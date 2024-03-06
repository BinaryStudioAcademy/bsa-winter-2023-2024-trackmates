import { type ChatMessageItemResponseDto } from "./chat-message-item-response-dto.type.js";

type ChatMessageItemWithReceiverIdResponseDto = Record<"receiverId", number> &
	Record<"chatMessage", ChatMessageItemResponseDto>;

export { type ChatMessageItemWithReceiverIdResponseDto };
