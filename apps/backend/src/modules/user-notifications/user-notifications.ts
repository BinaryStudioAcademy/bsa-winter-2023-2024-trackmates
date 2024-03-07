import { logger } from "~/libs/modules/logger/logger.js";
import { notificationService } from "~/modules/notifications/notifications.js";

import { UserNotificationController } from "./user-notification.controller.js";

const userNotificationController = new UserNotificationController(
	logger,
	notificationService,
);

export { userNotificationController };
