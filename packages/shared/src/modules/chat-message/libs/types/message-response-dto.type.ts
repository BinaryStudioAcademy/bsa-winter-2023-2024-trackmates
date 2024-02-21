import { type ValueOf } from "../../../../libs/types/value-of.type.js";
import { type UserAuthResponseDto } from "../../../users/users.js";
import { MessageStatus } from "../enums/message-status.enum.js";

type MessageResponseDto = {
	chatId: string;
	createdAt: string;
	id: number;
	message: string;
	receiverUser: UserAuthResponseDto;
	senderUser: UserAuthResponseDto;
	status: ValueOf<typeof MessageStatus>;
	updatedAt: string;
};

export { type MessageResponseDto };
