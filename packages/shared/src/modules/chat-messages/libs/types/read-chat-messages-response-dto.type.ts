import { type ChatMessageItemResponseDto } from "./chat-message-item-response-dto.type.js";

type ReadChatMessagesResponseDto = {
	items: ChatMessageItemResponseDto[];
	unreadMessagesCount: number;
};

export { type ReadChatMessagesResponseDto };
