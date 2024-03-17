import { logger } from "~/libs/modules/logger/logger.js";
import { taskScheduler } from "~/libs/modules/task-scheduler/task-scheduler.js";

import { SubscriptionController } from "./subscription.controller.js";
import { SubscriptionModel } from "./subscription.model.js";
import { SubscriptionRepository } from "./subscription.repository.js";
import { SubscriptionService } from "./subscription.service.js";

const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);
const subscriptionService = new SubscriptionService({
	subscriptionRepository,
	taskScheduler,
});
const subscriptionController = new SubscriptionController(
	logger,
	subscriptionService,
);

export { subscriptionController, subscriptionService };
export { type SubscriptionResponseDto } from "./libs/types/types.js";
export { SubscriptionEntity } from "./subscription.entity.js";
export { SubscriptionModel } from "./subscription.model.js";
