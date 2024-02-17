import { type FriendDto } from "~/libs/types/types.js";

import { type FriendResponseDto } from "../types/types.js";
import { handleFriendsCase } from "./handle-friends-case.helper.js";
import { handleInvitedCase } from "./handle-invited-case.helper.js";
import { handleRequestedCase } from "./handle-requested-case.helper.js";

const transformFriend = (currentUserId: number) => {
	return (friend: FriendResponseDto): FriendDto => {
		if (friend.isInvitationAccepted) {
			return handleFriendsCase(currentUserId, friend);
		} else if (currentUserId === friend.firstUserId) {
			return handleRequestedCase(friend);
		} else {
			return handleInvitedCase(friend);
		}
	};
};

export { transformFriend };
