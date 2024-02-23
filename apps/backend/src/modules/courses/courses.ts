import { logger } from "~/libs/modules/logger/logger.js";
import { UserCourseRepository } from "~/modules/user-courses/user-course.repository.js";
import { UserModel } from "~/modules/users/user.model.js";
import { udemyService, vendorService } from "~/modules/vendors/vendors.js";

import { CourseController } from "./course.controller.js";
import { CourseModel } from "./course.model.js";
import { CourseRepository } from "./course.repository.js";
import { CourseService } from "./course.service.js";

const vendorsApiMap = {
	udemy: udemyService,
};
const userCourseRepository = new UserCourseRepository(UserModel);
const courseRepository = new CourseRepository(CourseModel, UserModel);
const courseService = new CourseService({
	courseRepository,
	userCourseRepository,
	vendorService,
	vendorsApiMap,
});
const courseController = new CourseController(logger, courseService);

export { courseController, courseService };
export { CourseEntity } from "./course.entity.js";
export { CourseModel } from "./course.model.js";
export { type CourseService } from "./course.service.js";
export { type CourseDto } from "./libs/types/types.js";
