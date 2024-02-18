import { FriendStatus } from "~/libs/enums/enums.js";
import { type FriendDto } from "~/libs/types/types.js";

import { type FriendResponseDto } from "../types/types.js";

const handleFriendsCase = (
	currentUserId: number,
	{ id, recipientUser, senderUser, senderUserId }: FriendResponseDto,
): FriendDto => {
	return currentUserId === senderUserId
		? {
				fullName: `${recipientUser?.userDetails.firstName} ${recipientUser?.userDetails.lastName}`,
				id,
				status: FriendStatus.FRIEND,
			}
		: {
				fullName: `${senderUser?.userDetails.firstName} ${senderUser?.userDetails.lastName}`,
				id,
				status: FriendStatus.FRIEND,
			};
};

export { handleFriendsCase };
