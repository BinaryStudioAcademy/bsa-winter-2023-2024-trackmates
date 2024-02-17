import { FriendStatus } from "~/libs/enums/enums.js";
import { type FriendDto } from "~/libs/types/types.js";

import { TEMPLATE_IMAGE } from "../constants/constants.js";
import { type FriendResponseDto } from "../types/types.js";

const handleRequestedCase = ({
	id,
	recipientUser,
}: FriendResponseDto): FriendDto => {
	return {
		fullName: `${recipientUser?.userDetails.firstName} ${recipientUser?.userDetails.lastName}`,
		id,
		imageUrl: TEMPLATE_IMAGE,
		status: FriendStatus.REQUESTED,
	};
};

export { handleRequestedCase };
