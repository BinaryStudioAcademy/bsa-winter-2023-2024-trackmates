import { type ValueOf } from "~/libs/types/types.js";
import { ActivityType } from "~/modules/activities/activities.js";

import {
	type ActivityFinishCourseResponseDto,
	type ActivityFinishSectionResponseDto,
} from "../../types/types.js";
import { checkIsFinishSectionActivity } from "../check-is-finish-section-activity/check-is-finish-section-activity.helper.js";

const getOthersActivityTitle = (
	activityType: ValueOf<typeof ActivityType>,
	payload: ActivityFinishCourseResponseDto | ActivityFinishSectionResponseDto,
	pronoun: string,
): string => {
	const courseTitle = checkIsFinishSectionActivity(payload)
		? payload.courseTitle
		: null;

	switch (activityType) {
		case ActivityType.FINISH_COURSE: {
			return `Completed the "${payload.title}"course! Congratulate ${pronoun}!`;
		}

		case ActivityType.FINISH_SECTION: {
			return `Completed the  "${payload.title}" section of the "${courseTitle}" course! Congratulate ${pronoun}!`;
		}
	}
};

export { getOthersActivityTitle };
