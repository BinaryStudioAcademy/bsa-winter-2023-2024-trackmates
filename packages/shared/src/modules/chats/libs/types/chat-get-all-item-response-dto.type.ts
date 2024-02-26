import { type ChatMessageItemResponseDto } from "../../../chat-messages/chat-messages.js";
import { type UserAuthResponseDto } from "../../../users/users.js";

type ChatGetAllItemResponseDto = {
	createdAt: string;
	id: number;
	interlocutor: UserAuthResponseDto;
	lastMessage: ChatMessageItemResponseDto;
	unreadMessageCount: number;
	updatedAt: string;
};

export { ChatGetAllItemResponseDto };
