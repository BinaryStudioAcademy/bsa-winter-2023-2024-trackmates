import { socketService } from "~/libs/modules/socket/socket.js";

import { NotificationModel } from "./notification.model.js";
import { NotificationRepository } from "./notification.repository.js";
import { NotificationService } from "./notification.service.js";

const notificationRepository = new NotificationRepository(NotificationModel);
const notificationService = new NotificationService(
	notificationRepository,
	socketService,
);

export { notificationService };
export { NotificationType } from "./libs/enums/enums.js";
export { NotificationModel } from "./notification.model.js";
export { NotificationService } from "./notification.service.js";
