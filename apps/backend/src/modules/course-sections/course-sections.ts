// import { logger } from "~/libs/modules/logger/logger.js";

import { CourseSectionModel } from "./course-section.model.js";
import { CourseSectionRepository } from "./course-section.repository.js";
import { CourseSectionService } from "./course-section.service.js";

const courseSectionRepository = new CourseSectionRepository(CourseSectionModel);

const courseSectionService = new CourseSectionService({
	courseSectionRepository,
});
//TODO
// const courseSectionController = new CourseSectionController(
// 	logger,
// 	courseSectionService,
// );

export { courseSectionService };
