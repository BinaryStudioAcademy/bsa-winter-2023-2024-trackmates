import { NotificationModel } from "./notification.model.js";
import { NotificationRepository } from "./notification.repository.js";
import { NotificationService } from "./notification.service.js";

const notificationRepository = new NotificationRepository(NotificationModel);
const notificationService = new NotificationService(notificationRepository);

export { notificationService };
export { NotificationMessage } from "./libs/enums/enums.js";
export { NotificationService } from "./notification.service.js";
