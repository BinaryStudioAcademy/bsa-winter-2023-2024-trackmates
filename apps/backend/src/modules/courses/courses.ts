import { logger } from "~/libs/modules/logger/logger.js";
import { udemy } from "~/libs/modules/udemy/udemy.js";

import { userCourseService } from "../user-courses/user-courses.js";
import { UserModel } from "../users/user.model.js";
import { vendorService } from "../vendors/vendors.js";
import { CourseController } from "./course.controller.js";
import { CourseModel } from "./course.model.js";
import { CourseRepository } from "./course.repository.js";
import { CourseService } from "./course.service.js";
import { UdemyFieldsMapping } from "./libs/enums/enums.js";

const vendorsApiMap = {
	udemy,
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
