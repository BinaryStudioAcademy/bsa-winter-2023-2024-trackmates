import { FriendStatus } from "~/libs/enums/enums.js";
import { type FriendDto } from "~/libs/types/types.js";

import { TEMPLATE_IMAGE } from "../constants/constants.js";
import { type FriendResponseDto } from "../types/types.js";

const handleInvitedCase = ({
	id,
	senderUser,
}: FriendResponseDto): FriendDto => {
	return {
		fullName: `${senderUser?.userDetails.firstName} ${senderUser?.userDetails.lastName}`,
		id,
		imageUrl: TEMPLATE_IMAGE,
		status: FriendStatus.INVITED,
	};
};

export { handleInvitedCase };
