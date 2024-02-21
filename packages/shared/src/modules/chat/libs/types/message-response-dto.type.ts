import { type ValueOf } from "../../../../libs/types/types.js";
import { type UserAuthResponseDto } from "../../../users/users.js";
import { MessageStatus } from "../enums/enums.js";

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
