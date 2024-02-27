import { logger } from "~/libs/modules/logger/logger.js";
import { CourseModel, courseService } from "~/modules/courses/courses.js";
import { UserModel } from "~/modules/users/user.model.js";

import { CourseRepository } from "../courses/course.repository.js";
import { UserCourseController } from "./user-course.controller.js";
import { UserCourseService } from "./user-course.service.js";

const courseRepository = new CourseRepository(CourseModel, UserModel);
const userCourseService = new UserCourseService({
	courseRepository,
	courseService,
});
const userCourseController = new UserCourseController(
	logger,
	userCourseService,
);

export { userCourseController };
