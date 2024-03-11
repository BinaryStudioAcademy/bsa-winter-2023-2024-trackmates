type PushSubscription = {
	endpoint: string;
	expirationTime: null | number;
	keys: {
		auth: string;
		p256dh: string;
	};
};

export { type PushSubscription };
