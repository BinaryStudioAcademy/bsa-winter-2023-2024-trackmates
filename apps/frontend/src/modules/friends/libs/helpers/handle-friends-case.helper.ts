import { FriendStatus } from "~/libs/enums/enums.js";
import { type Friend } from "~/libs/types/types.js";

import { TEMPLATE_IMAGE } from "../constants/constants.js";
import { type FriendResponseDto } from "../types/types.js";

const handleFriendsCase = (
	currentUserId: number,
	{ firstUser, firstUserId, id, secondUser }: FriendResponseDto,
): Friend => {
	return currentUserId === firstUserId
		? {
				fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
				id,
				imageUrl: TEMPLATE_IMAGE,
				status: FriendStatus.FRIEND,
			}
		: {
				fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
				id,
				imageUrl: TEMPLATE_IMAGE,
				status: FriendStatus.FRIEND,
			};
};

export { handleFriendsCase };
