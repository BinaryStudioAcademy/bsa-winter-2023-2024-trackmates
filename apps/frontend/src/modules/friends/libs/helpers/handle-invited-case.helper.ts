import { FriendStatus } from "~/libs/enums/enums.js";
import { type FriendDto } from "~/libs/types/types.js";

import { type FriendResponseDto } from "../types/types.js";

const handleInvitedCase = ({
	id,
	senderUser,
}: FriendResponseDto): FriendDto => {
	return {
		fullName: `${senderUser?.userDetails.firstName} ${senderUser?.userDetails.lastName}`,
		id,
		status: FriendStatus.INVITED,
	};
};

export { handleInvitedCase };
