import { type Friend } from "~/libs/types/types.js";

import { type FriendResponseDto } from "../types/types.js";

const transformFriend = (currentUserId: number) => {
	const imageUrl =
		"https://s3-alpha-sig.figma.com/img/e5a8/4d2a/8468b40071144244537e7aa36b4d9354?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YabQdizET7TaHqgYdN~Kai8uMZBSMzSZ0rZL2goz3TgB0QE14X~jzsIvcN5yRmYT~dT5q3Xo33ThriO0QmovboskT6Um5OagC-Zyj-zu40pczDLI7L7-sw15AXjfIWA1G5nPCPPQ30lmLG999MM-LY9v~a1BnhmwDJ1N9r7bPaBOA8PEEmJ4RDSCfnhJC9sDdHUG8-VJGh04amY7NCrKHJjhTYW5iEIlkFiN5pkl7HhTCh-IWckvqZAeB-qTcfhb6AW60gf0IqzzNIO-KeLz1LdpCvSe0Ynty5W4qkLJFwtqCA2jBPkTRfk~iFgspQtBE7Xy3u~0j4EK8dKxx9~RbQ__";

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
						imageUrl,
						status: "friend",
					}
				: {
						fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
						id,
						imageUrl,
						status: "friend",
					};
		} else if (currentUserId === firstUserId) {
			return {
				fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
				id,
				imageUrl,
				status: "requested",
			};
		} else {
			return {
				fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
				id,
				imageUrl,
				status: "invited",
			};
		}
	};
};

export { transformFriend };
