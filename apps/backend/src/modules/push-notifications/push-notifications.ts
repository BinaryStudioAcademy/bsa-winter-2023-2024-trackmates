import { logger } from "~/libs/modules/logger/logger.js";

import {
	PushSubscriptionModel,
	PushSubscriptionRepository,
	PushSubscriptionService,
} from "../push-subscriptions/push-subscriptions.js";
import { PushNotificationController } from "./push-notification.controller.js";

const pushSubscriptionRepository = new PushSubscriptionRepository(
	PushSubscriptionModel,
);
const pushSubscriptionService = new PushSubscriptionService(
	pushSubscriptionRepository,
);
const pushNotificationsController = new PushNotificationController(
	logger,
	pushSubscriptionService,
);

export { pushNotificationsController };
