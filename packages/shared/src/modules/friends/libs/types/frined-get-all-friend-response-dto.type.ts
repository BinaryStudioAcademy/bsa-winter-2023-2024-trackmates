import { UserAuthResponseDto } from "src/modules/users/users.js";

import { FriendAddNewResponsetDto } from "../../friends.js";

type FriendGetAllFriendeDto = FriendAddNewResponsetDto & {
	firstUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
	secondUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
};

export { FriendGetAllFriendeDto };
