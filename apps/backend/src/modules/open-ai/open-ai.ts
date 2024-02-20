import { logger } from "~/libs/modules/logger/logger.js";
import { courseService } from "~/modules/courses/courses.js";

import { OpenAiController } from "./open-ai.controller.js";
import { OpenAiService } from "./open-ai.service.js";

const openAiService = new OpenAiService(courseService);
const openAiController = new OpenAiController(logger, openAiService);

export { openAiController };
