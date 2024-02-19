import { FriendAcceptResponseDto } from "./friend-accept-response-dto.type.js";

type FriendResponseDto = FriendAcceptResponseDto & {
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

export { FriendResponseDto };
