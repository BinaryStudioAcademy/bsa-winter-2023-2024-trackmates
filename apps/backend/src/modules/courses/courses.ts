import { logger } from "~/libs/modules/logger/logger.js";
import { udemy } from "~/libs/modules/udemy/udemy.js";

import { CourseController } from "./course.controller.js";
import { CourseService } from "./course.service.js";

const courseService = new CourseService({ udemy });
const courseController = new CourseController(logger, courseService);

export { courseController };
