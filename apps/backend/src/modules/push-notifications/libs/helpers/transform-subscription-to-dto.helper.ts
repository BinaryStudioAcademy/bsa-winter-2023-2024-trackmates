import {
	type PushSubscription,
	type PushSubscriptionRequestDto,
} from "~/modules/push-subscriptions/push-subscriptions.js";

const transformSubscriptionToDto = (
	subscription: PushSubscription,
): PushSubscriptionRequestDto => {
	return {
		authKey: subscription.keys.auth,
		endpoint: subscription.endpoint,
		expirationTime: subscription.expirationTime,
		p256dhKey: subscription.keys.p256dh,
	};
};

export { transformSubscriptionToDto };
