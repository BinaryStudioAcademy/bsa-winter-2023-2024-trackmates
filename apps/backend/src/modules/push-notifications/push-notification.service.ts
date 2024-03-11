import { type PushNotification } from "~/libs/modules/push-notification/push-notification.js";
import {
	type PushSubscription,
	type PushSubscriptionResponseDto,
	type PushSubscriptionService,
} from "~/modules/push-subscriptions/push-subscriptions.js";

import {
	checkIsInvalidSubscription,
	transformDtoToSubscription,
	transformSubscriptionToDto,
} from "./libs/helpers/helpers.js";
import { type PushNotificationRequestDto } from "./libs/types/types.js";

type Constructor = {
	pushNotification: PushNotification;
	pushSubscriptionService: PushSubscriptionService;
};

class PushNotificationService {
	private pushNotification: PushNotification;

	private pushSubscriptionService: PushSubscriptionService;

	public constructor({
		pushNotification,
		pushSubscriptionService,
	}: Constructor) {
		this.pushSubscriptionService = pushSubscriptionService;
		this.pushNotification = pushNotification;
	}

	public async createSubscription(
		subscription: PushSubscription,
	): Promise<PushSubscriptionResponseDto> {
		return await this.pushSubscriptionService.create({
			...transformSubscriptionToDto(subscription),
		});
	}

	public async sendNotificationsToSubscribers(
		notification: PushNotificationRequestDto,
	): Promise<void> {
		const { items: subscriptions } =
			await this.pushSubscriptionService.findAll();

		await Promise.all(
			subscriptions.map(async (subscription) => {
				try {
					await this.pushNotification.sendNotification(
						transformDtoToSubscription(subscription),
						JSON.stringify(notification),
					);
				} catch (error) {
					if (checkIsInvalidSubscription(error)) {
						await this.pushSubscriptionService.delete(subscription.id);
					}
				}
			}),
		);
	}
}

export { PushNotificationService };
