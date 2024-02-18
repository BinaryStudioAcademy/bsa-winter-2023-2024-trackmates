import { logger } from "~/libs/modules/logger/logger.js";
import { udemy } from "~/libs/modules/udemy/udemy.js";

import { UserModel } from "../users/user.model.js";
import { CourseController } from "./course.controller.js";
import { CourseModel } from "./course.model.js";
import { CourseRepository } from "./course.repository.js";
import { CourseService } from "./course.service.js";

const courseRepository = new CourseRepository(CourseModel, UserModel);
const courseService = new CourseService({ courseRepository, udemy });
const courseController = new CourseController(logger, courseService);

export { courseController };
