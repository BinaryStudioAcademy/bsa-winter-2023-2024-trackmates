import { type ValueOf } from "../../../../libs/types/types.js";
import { type UserAuthResponseDto } from "../../../users/users.js";
import { type MessageStatus } from "../enums/enums.js";

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
