import { type MessageItemResponseDto } from "../../../chat-messages/chat-messages.js";
import { type UserAuthResponseDto } from "../../../users/users.js";

type ChatGetAllItemResponseDto = {
	chatId: number;
	createdAt: string;
	interlocutor: UserAuthResponseDto;
	lastMessage: MessageItemResponseDto;
	unreadMessageCount: number;
	updatedAt: string;
};

export { ChatGetAllItemResponseDto };
