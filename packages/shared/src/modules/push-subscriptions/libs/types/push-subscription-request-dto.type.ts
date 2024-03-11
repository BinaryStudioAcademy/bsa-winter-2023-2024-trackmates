type PushSubscriptionRequestDto = {
	authKey: string;
	endpoint: string;
	expirationTime: null | number;
	p256dhKey: string;
};

export { type PushSubscriptionRequestDto };
