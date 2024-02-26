import { type ValueOf } from "../../../../libs/types/value-of.type.js";
import { type UserAuthResponseDto } from "../../../users/users.js";
import { MessageStatus } from "../enums/message-status.enum.js";

type ChatMessageItemResponseDto = {
	chatId: number;
	createdAt: string;
	id: number;
	senderUser: UserAuthResponseDto;
	status: ValueOf<typeof MessageStatus>;
	text: string;
	updatedAt: string;
};

export { type ChatMessageItemResponseDto };
