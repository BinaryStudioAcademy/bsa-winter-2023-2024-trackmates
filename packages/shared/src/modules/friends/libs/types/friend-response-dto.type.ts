import { type FriendAddNewResponseDto } from "./friend-add-new-response.dto.type.js";

type FriendResponseDto = FriendAddNewResponseDto & {
	recipientUser?: {
		id: number;
		userDetails?: {
			firstName: string;
			lastName: string;
		};
	} | null;
	senderUser?: {
		id: number;
		userDetails?: {
			firstName: string;
			lastName: string;
		};
	} | null;
};

export { type FriendResponseDto };
