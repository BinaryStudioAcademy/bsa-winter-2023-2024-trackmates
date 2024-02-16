import { UserAuthResponseDto } from "src/modules/users/users.js";

import { type FriendAddNewResponseDto } from "./friend-add-new-response.dto.type.js";

type FriendResponseDto = FriendAddNewResponseDto & {
	firstUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
	secondUser?: {
		id: number;
		userDetails: UserAuthResponseDto;
	};
};

export { type FriendResponseDto };
