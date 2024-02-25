import { type UserAuthResponseDto } from "../../../users/users.js";

type ChatSingleItemResponseDto = {
	chatId: number;
	interlocutor: UserAuthResponseDto;
	messages: [];
};

export { type ChatSingleItemResponseDto };
