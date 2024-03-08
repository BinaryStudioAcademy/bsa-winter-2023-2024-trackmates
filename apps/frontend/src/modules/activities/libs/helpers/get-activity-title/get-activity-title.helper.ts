import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	ActivityType,
} from "~/modules/activities/activities.js";
import { UserSex, UserSexToPronoun } from "~/modules/users/users.js";

const getActivityTitle = (
	activity: ActivityResponseDto<ValueOf<typeof ActivityType>>,
): string => {
	const userFullName = `${activity.user.firstName} ${activity.user.lastName}`;
	const { title } = activity.payload;

	// or it is better to set default value in UserAuthResponseDto and UserEntity?
	const sex = activity.user.sex || UserSex.PREFER_NOT_TO_SAY;
	const pronoun = UserSexToPronoun[sex].OBJECTIVE;

	switch (activity.type) {
		case ActivityType.FINISH_COURSE: {
			return `Course: ${userFullName} has finished course "${title}". Congratulate ${pronoun}!`;
		}

		case ActivityType.FINISH_SECTION: {
			return `Module:  ${userFullName} has finished module "${title}". Congratulate ${pronoun}!`;
		}
	}
};

export { getActivityTitle };
