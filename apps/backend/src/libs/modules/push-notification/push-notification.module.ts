import webPush from "web-push";

type Constructor = {
	privateKey: string;
	publicKey: string;
};

class PushNotification {
	public constructor({ privateKey, publicKey }: Constructor) {
		webPush.setVapidDetails("mailto:your@email.com", publicKey, privateKey);
	}

	public sendNotification(
		subscription: webPush.PushSubscription,
		payload?: Buffer | null | string | undefined,
		options?: undefined | webPush.RequestOptions,
	): Promise<webPush.SendResult> {
		return webPush.sendNotification(subscription, payload, options);
	}
}

export { PushNotification };
