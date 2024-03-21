import { type ChatMessageItemResponseDto } from "./chat-message-item-response-dto.type.js";

type ReadChatMessagesResponseDto = {
	chatId: number;
	items: ChatMessageItemResponseDto[];
	readerId: number;
};

export { type ReadChatMessagesResponseDto };
