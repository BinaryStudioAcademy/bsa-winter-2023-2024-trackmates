import { logger } from "~/libs/modules/logger/logger.js";

import { CourseSectionController } from "./course-section.controller.js";
import { CourseSectionModel } from "./course-section.model.js";
import { CourseSectionRepository } from "./course-section.repository.js";
import { CourseSectionService } from "./course-section.service.js";

const courseSectionRepository = new CourseSectionRepository(CourseSectionModel);

const courseSectionService = new CourseSectionService({
	courseSectionRepository,
});
const courseSectionController = new CourseSectionController(
	logger,
	courseSectionService,
);

export { courseSectionController, courseSectionRepository };
export { CourseSectionEntity } from "./course-section.entity.js";
export { type CourseSectionRepository } from "./course-section.repository.js";
export { type CourseSectionDto } from "./libs/types/types.js";
