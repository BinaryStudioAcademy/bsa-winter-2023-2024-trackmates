import { logger } from "~/libs/modules/logger/logger.js";
import { pushNotification } from "~/libs/modules/push-notification/push-notification.js";

import {
	PushSubscriptionModel,
	PushSubscriptionRepository,
	PushSubscriptionService,
} from "../push-subscriptions/push-subscriptions.js";
import { PushNotificationController } from "./push-notification.controller.js";
import { PushNotificationService } from "./push-notification.service.js";

const pushSubscriptionRepository = new PushSubscriptionRepository(
	PushSubscriptionModel,
);
const pushSubscriptionService = new PushSubscriptionService(
	pushSubscriptionRepository,
);

const pushNotificationService = new PushNotificationService({
	pushNotification,
	pushSubscriptionService,
});
const pushNotificationsController = new PushNotificationController(
	logger,
	pushNotificationService,
);

export { pushNotificationsController };
