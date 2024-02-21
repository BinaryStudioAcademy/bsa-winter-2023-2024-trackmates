import { logger } from "~/libs/modules/logger/logger.js";
import { userCourseService } from "~/modules/user-courses/user-courses.js";
import { UserModel } from "~/modules/users/user.model.js";
import { udemyService, vendorService } from "~/modules/vendors/vendors.js";

import { CourseController } from "./course.controller.js";
import { CourseModel } from "./course.model.js";
import { CourseRepository } from "./course.repository.js";
import { CourseService } from "./course.service.js";
import { UdemyFieldsMapping } from "./libs/enums/enums.js";

const vendorsApiMap = {
	udemy: udemyService,
};
const vendorsFieldsMappingMap = {
	udemy: UdemyFieldsMapping,
};
const courseRepository = new CourseRepository(CourseModel, UserModel);
const courseService = new CourseService({
	courseRepository,
	userCourseService,
	vendorService,
	vendorsApiMap,
	vendorsFieldsMappingMap,
});
const courseController = new CourseController(logger, courseService);

export { courseController };
export { CourseEntity } from "./course.entity.js";
export { CourseModel } from "./course.model.js";
export { type CourseDto } from "./libs/types/types.js";
