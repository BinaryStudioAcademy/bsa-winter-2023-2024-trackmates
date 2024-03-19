import { type ValueOf } from "~/libs/types/types.js";
import { ActivityType } from "~/modules/activities/activities.js";

import {
	type ActivityFinishCourseResponseDto,
	type ActivityFinishSectionResponseDto,
} from "../../types/types.js";
import { checkIsFinishSectionActivity } from "../check-is-finish-section-activity/check-is-finish-section-activity.helper.js";

const getOwnActivityTitle = (
	activityType: ValueOf<typeof ActivityType>,
	payload: ActivityFinishCourseResponseDto | ActivityFinishSectionResponseDto,
): string => {
	switch (activityType) {
		case ActivityType.FINISH_COURSE: {
			return `Congratulations on completing the "${payload.title}" course!`;
		}

		case ActivityType.FINISH_SECTION: {
			const courseTitle = checkIsFinishSectionActivity(payload)
				? payload.courseTitle
				: null;

			return `Congratulations on completing the "${payload.title}" section of the "${courseTitle}" course!`;
		}
	}
};

export { getOwnActivityTitle };
