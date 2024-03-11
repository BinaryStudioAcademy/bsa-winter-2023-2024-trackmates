type PushSubscriptionResponseDto = {
	authKey: string;
	endpoint: string;
	expirationTime: null | number;
	id: number;
	p256dhKey: string;
};

export { type PushSubscriptionResponseDto };
