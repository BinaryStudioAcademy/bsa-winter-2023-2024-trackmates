import { logger } from "~/libs/modules/logger/logger.js";
import { udemy } from "~/libs/modules/udemy/udemy.js";

import { CoursesController } from "./coursses.controller.js";
import { CoursesService } from "./coursses.service.js";

const coursesService = new CoursesService({ udemy });
const coursesController = new CoursesController(logger, coursesService);

export { coursesController };
