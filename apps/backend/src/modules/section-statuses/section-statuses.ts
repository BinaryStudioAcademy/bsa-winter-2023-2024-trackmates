import { logger } from "~/libs/modules/logger/logger.js";

import { SectionStatusController } from "./section-status.controller.js";
import { SectionStatusModel } from "./section-status.model.js";
import { SectionStatusRepository } from "./section-status.repository.js";
import { SectionStatusService } from "./section-status.service.js";

const sectionStatusRepository = new SectionStatusRepository(SectionStatusModel);
const sectionStatusService = new SectionStatusService({
	sectionStatusRepository,
});
const sectionStatusController = new SectionStatusController(
	logger,
	sectionStatusService,
);

export { sectionStatusController };
export { SectionStatusModel } from "./section-status.model.js";
