import { logger } from "~/libs/modules/logger/logger.js";
import { activityLikeRepository } from "~/modules/activity-likes/activity-likes.js";

import { ActivityController } from "./activity.controller.js";
import { ActivityModel } from "./activity.model.js";
import { ActivityRepository } from "./activity.repository.js";
import { ActivityService } from "./activity.service.js";

const activityRepository = new ActivityRepository(ActivityModel);
const activityService = new ActivityService({
	activityLikeRepository,
	activityRepository,
});
const activityController = new ActivityController(logger, activityService);

export { activityController, activityService };
export { ActivityModel } from "./activity.model.js";
export { type ActivityService } from "./activity.service.js";
