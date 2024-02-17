import { type UserAuthResponseDto } from "src/modules/users/users.js";

import { type FriendAcceptResponseDto } from "../../friends.js";

type FriendResponseDto = FriendAcceptResponseDto & {
	recipientUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
	senderUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
};

export { FriendResponseDto };
