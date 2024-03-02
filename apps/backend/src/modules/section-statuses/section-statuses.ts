import { logger } from "~/libs/modules/logger/logger.js";
import { activityService } from "~/modules/activities/activities.js";
import { courseSectionRepository } from "~/modules/course-sections/course-sections.js";

import { SectionStatusController } from "./section-status.controller.js";
import { SectionStatusModel } from "./section-status.model.js";
import { SectionStatusRepository } from "./section-status.repository.js";
import { SectionStatusService } from "./section-status.service.js";

const sectionStatusRepository = new SectionStatusRepository(SectionStatusModel);
const sectionStatusService = new SectionStatusService({
	activityService,
	courseSectionRepository,
	sectionStatusRepository,
});
const sectionStatusController = new SectionStatusController(
	logger,
	sectionStatusService,
);

export { sectionStatusController };
