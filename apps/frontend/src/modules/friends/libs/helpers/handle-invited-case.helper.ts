import { FriendStatus } from "~/libs/enums/enums.js";
import { type Friend } from "~/libs/types/types.js";

import { TEMPLATE_IMAGE } from "../constants/constants.js";
import { type FriendResponseDto } from "../types/types.js";

const handleInvitedCase = ({ firstUser, id }: FriendResponseDto): Friend => {
	return {
		fullName: `${firstUser?.userDetails.firstName} ${firstUser?.userDetails.lastName}`,
		id,
		imageUrl: TEMPLATE_IMAGE,
		status: FriendStatus.INVITED,
	};
};

export { handleInvitedCase };
