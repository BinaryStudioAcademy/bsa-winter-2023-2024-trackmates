import { type Friend } from "~/libs/types/types.js";

import { TEMPLATE_IMAGE } from "../constants/constants.js";
import { type FriendResponseDto } from "../types/types.js";

const transformFriend = (currentUserId: number) => {
	return ({
		firstUser,
		firstUserId,
		id,
		isInvitationAccepted,
		secondUser,
	}: FriendResponseDto): Friend => {
		if (isInvitationAccepted) {
			return currentUserId === firstUserId
				? {
						fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
						id,
						imageUrl: TEMPLATE_IMAGE,
						status: "friend",
					}
				: {
						fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
						id,
						imageUrl: TEMPLATE_IMAGE,
						status: "friend",
					};
		} else if (currentUserId === firstUserId) {
			return {
				fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
				id,
				imageUrl: TEMPLATE_IMAGE,
				status: "requested",
			};
		} else {
			return {
				fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
				id,
				imageUrl: TEMPLATE_IMAGE,
				status: "invited",
			};
		}
	};
};

export { transformFriend };
