import {
	type PushSubscription,
	type PushSubscriptionRequestDto,
} from "~/modules/push-subscriptions/push-subscriptions.js";

const transformDtoToSubscription = (
	subscription: PushSubscriptionRequestDto,
): PushSubscription => {
	return {
		endpoint: subscription.endpoint,
		expirationTime: subscription.expirationTime,
		keys: {
			auth: subscription.authKey,
			p256dh: subscription.p256dhKey,
		},
	};
};

export { transformDtoToSubscription };
