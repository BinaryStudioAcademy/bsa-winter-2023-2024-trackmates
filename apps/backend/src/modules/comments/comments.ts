import { logger } from "~/libs/modules/logger/logger.js";
import { activityService } from "~/modules/activities/activities.js";
import { notificationService } from "~/modules/notifications/notifications.js";

import { CommentController } from "./comment.controller.js";
import { CommentModel } from "./comment.model.js";
import { CommentRepository } from "./comment.repository.js";
import { CommentService } from "./comment.service.js";

const commentRepository = new CommentRepository(CommentModel);
const commentService = new CommentService({
	activityService,
	commentRepository,
	notificationService,
});
const commentController = new CommentController(logger, commentService);

export { commentController };
export { CommentModel } from "./comment.model.js";
