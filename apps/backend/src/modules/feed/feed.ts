import { logger } from "~/libs/modules/logger/logger.js";

import { FeedController } from "./feed.controller.js";
import { FeedService } from "./feed.service.js";

const feedService = new FeedService();
const feedController = new FeedController(logger, feedService);

export { feedController };
