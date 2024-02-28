import { type ChatMessageItemResponseDto } from "../../../chat-messages/chat-messages.js";
import { type UserAuthResponseDto } from "../../../users/users.js";

type ChatItemResponseDto = {
	id: number;
	interlocutor: UserAuthResponseDto;
	messages: ChatMessageItemResponseDto[];
};

export { type ChatItemResponseDto };
