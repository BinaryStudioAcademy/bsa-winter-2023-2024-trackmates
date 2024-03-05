import { type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityResponseDto,
	ActivityTypeValue,
} from "~/modules/activities/activities.js";

const getActivityTitle = (
	activity: ActivityResponseDto<ValueOf<typeof ActivityTypeValue>>,
): string => {
	const userFullName = `${activity.user.firstName} ${activity.user.lastName}`;
	const { title } = activity.payload;

	switch (activity.type) {
		case ActivityTypeValue.FINISH_COURSE: {
			return `Course: ${userFullName} has finished course "${title}". Congratulate her(him)!`;
		}

		case ActivityTypeValue.FINISH_SECTION: {
			return `Module:  ${userFullName} has finished module "${title}". Congratulate her(him)!`;
		}
	}
};

export { getActivityTitle };
