import { type FriendDto } from "~/libs/types/types.js";

import { StatusRank } from "../enums/enums.js";

const sortOrder: Record<FriendDto["status"], number> = {
	friend: StatusRank.FRIEND,
	invited: StatusRank.INVITED,
	requested: StatusRank.REQUESTED,
	unknown: StatusRank.UNKNOWN,
};

export { sortOrder };
