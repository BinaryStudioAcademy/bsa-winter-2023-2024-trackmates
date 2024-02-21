import { logger } from "~/libs/modules/logger/logger.js";
import { UserModel } from "~/modules/users/user.model.js";

import { UserCourseController } from "./user-course.controller.js";
import { UserCourseRepository } from "./user-course.repository.js";
import { UserCourseService } from "./user-course.service.js";

const userCourseRepository = new UserCourseRepository(UserModel);
const userCourseService = new UserCourseService({
	userCourseRepository,
});
const userCourseController = new UserCourseController(
	logger,
	userCourseService,
);

export { userCourseController, userCourseService };
export { type UserCourseService } from "./user-course.service.js";
