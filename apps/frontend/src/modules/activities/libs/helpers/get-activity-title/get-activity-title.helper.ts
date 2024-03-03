import { ActivityTypeValue } from "~/modules/activities/libs/enums/enums.js";
import {
	type ActivityDto,
	type ActivityType,
} from "~/modules/activities/libs/types/types.js";

const getActivityTitle = (activity: ActivityDto<ActivityType>): string => {
	const userFullName = `${activity.user.firstName} ${activity.user.lastName}`;
	const title = activity.payload.title;

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
