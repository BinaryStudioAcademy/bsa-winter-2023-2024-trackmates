import { type UserAuthResponseDto } from "../../../users/users.js";
import { type MessageResponseDto } from "./message-response-dto.type.js";

type ChatItemResponseDto = {
	id: string;
	interlocutor: UserAuthResponseDto;
	lastMessage: MessageResponseDto;
	unreadMessageCount: number;
};

export { type ChatItemResponseDto };
