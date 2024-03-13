import { logger } from "~/libs/modules/logger/logger.js";
import { ActivityModel } from "~/modules/activities/activity.model.js";
import { ActivityRepository } from "~/modules/activities/activity.repository.js";
import { ActivityService } from "~/modules/activities/activity.service.js";
import { activityLikeRepository } from "~/modules/activity-likes/activity-likes.js";
import { courseSectionRepository } from "~/modules/course-sections/course-sections.js";
import { courseRepository } from "~/modules/courses/courses.js";
import { notificationService } from "~/modules/notifications/notifications.js";

import { SectionStatusController } from "./section-status.controller.js";
import { SectionStatusModel } from "./section-status.model.js";
import { SectionStatusRepository } from "./section-status.repository.js";
import { SectionStatusService } from "./section-status.service.js";

const activityRepository = new ActivityRepository(ActivityModel);
const activityService = new ActivityService({
	activityLikeRepository,
	activityRepository,
	notificationService,
});
const sectionStatusRepository = new SectionStatusRepository(SectionStatusModel);
const sectionStatusService = new SectionStatusService({
	activityService,
	courseRepository,
	courseSectionRepository,
	sectionStatusRepository,
});
const sectionStatusController = new SectionStatusController(
	logger,
	sectionStatusService,
);

export { sectionStatusController, sectionStatusService };
export { SectionStatusModel } from "./section-status.model.js";
export { type SectionStatusService } from "./section-status.service.js";
