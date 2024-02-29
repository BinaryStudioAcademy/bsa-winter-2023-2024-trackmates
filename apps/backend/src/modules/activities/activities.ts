import { logger } from "~/libs/modules/logger/logger.js";

import { ActivityController } from "./activity.controller.js";
import { SectionActivityModel } from "./activity.model.js";
import { SectionActivityRepository } from "./activity.repository.js";
import { ActivityService } from "./activity.service.js";

const sectionActivityRepository = new SectionActivityRepository(
	SectionActivityModel,
);
const activityService = new ActivityService({ sectionActivityRepository });
const activityController = new ActivityController(logger, activityService);

export { activityController };
