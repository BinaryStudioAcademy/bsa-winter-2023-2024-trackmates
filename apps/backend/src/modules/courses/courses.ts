import { logger } from "~/libs/modules/logger/logger.js";
import { UserModel } from "~/modules/users/user.model.js";
import { udemyService, vendorService } from "~/modules/vendors/vendors.js";

import { courseSectionRepository } from "../course-sections/course-sections.js";
import { CourseController } from "./course.controller.js";
import { CourseModel } from "./course.model.js";
import { CourseRepository } from "./course.repository.js";
import { CourseService } from "./course.service.js";

const vendorsApiMap = {
	udemy: udemyService,
};
const courseRepository = new CourseRepository(CourseModel, UserModel);
const courseService = new CourseService({
	courseRepository,
	courseSectionRepository,
	vendorService,
	vendorsApiMap,
});
const courseController = new CourseController(logger, courseService);

export { courseController, courseService };
export { CourseModel } from "./course.model.js";
export { type CourseService } from "./course.service.js";
export { type CourseDto } from "./libs/types/types.js";
