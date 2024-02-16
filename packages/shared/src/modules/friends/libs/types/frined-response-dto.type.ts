import { UserAuthResponseDto } from "src/modules/users/users.js";

import { FriendAcceptResponseDto } from "../../friends.js";

type FriendResponseDto = FriendAcceptResponseDto & {
	firstUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
	secondUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
};

export { FriendResponseDto };
