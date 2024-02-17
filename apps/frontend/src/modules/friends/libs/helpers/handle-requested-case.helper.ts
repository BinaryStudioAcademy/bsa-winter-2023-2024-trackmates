import { FriendStatus } from "~/libs/enums/enums.js";
import { type FriendDto } from "~/libs/types/types.js";

import { TEMPLATE_IMAGE } from "../constants/constants.js";
import { type FriendResponseDto } from "../types/types.js";

const handleRequestedCase = ({
	id,
	secondUser,
}: FriendResponseDto): FriendDto => {
	return {
		fullName: `${secondUser?.userDetails.firstName} ${secondUser?.userDetails.lastName}`,
		id,
		imageUrl: TEMPLATE_IMAGE,
		status: FriendStatus.REQUESTED,
	};
};

export { handleRequestedCase };
