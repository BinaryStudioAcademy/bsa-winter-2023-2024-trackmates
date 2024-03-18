import { type ChatMessageItemResponseDto } from "./chat-message-item-response-dto.type.js";

type ReadChatMessagesResponseDto = {
	chatId: number;
	items: ChatMessageItemResponseDto[];
	unreadMessageCount: number;
	unreadMessageCountTotal: number;
};

export { type ReadChatMessagesResponseDto };
