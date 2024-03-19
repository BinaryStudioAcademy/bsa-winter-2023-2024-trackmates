import { type ValueOf } from "~/libs/types/types.js";
import { UserSex, userSexToPronoun } from "~/modules/users/users.js";

import { type ActivityType } from "../../enums/enums.js";
import { type ActivityResponseDto } from "../../types/types.js";
import { getOthersActivityTitle } from "./get-others-activity-title.helper.js";
import { getOwnActivityTitle } from "./get-own-activity-title.helper.js";

const getActivityTitle = (
	activity: ActivityResponseDto<ValueOf<typeof ActivityType>>,
	userId: number,
): string => {
	const { payload, type, user } = activity;
	const { id, sex } = user;
	const pronoun = userSexToPronoun[sex ?? UserSex.PREFER_NOT_TO_SAY].OBJECTIVE;

	const isOwnActivity = userId === id;

	return isOwnActivity
		? getOwnActivityTitle(type, payload)
		: getOthersActivityTitle(type, payload, pronoun);
};

export { getActivityTitle };
