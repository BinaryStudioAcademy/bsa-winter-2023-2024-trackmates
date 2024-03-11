import { GRANTED_PERMISSION } from "./libs/constants/constants.js";
import { type PushNotificationApi } from "./push-notification-api.js";

class PushNotification {
	private isGranted: boolean = false;

	private isInitialized: boolean = false;

	private publicKey: string;

	private pushNotificationApi!: PushNotificationApi;

	private subscription!: PushSubscription;

	private swRegistration!: ServiceWorkerRegistration;

	public constructor({
		publicKey,
		pushNotificationApi,
	}: {
		publicKey: string;
		pushNotificationApi: PushNotificationApi;
	}) {
		this.publicKey = publicKey;
		this.pushNotificationApi = pushNotificationApi;
	}

	private checkIsSupported(): boolean {
		return "serviceWorker" in navigator && "PushManager" in window;
	}

	public async initialize(): Promise<void> {
		this.isInitialized = true;

		if (!this.checkIsSupported()) {
			this.isGranted = false;

			return;
		}

		const response = await Notification.requestPermission();
		this.isGranted = response === GRANTED_PERMISSION;

		if (this.isGranted) {
			this.swRegistration =
				(await navigator.serviceWorker.getRegistration()) ??
				(await navigator.serviceWorker.register("/dev-dist/sw.js"));
			this.subscription = await this.swRegistration.pushManager.subscribe({
				applicationServerKey: this.publicKey,
				userVisibleOnly: true,
			});

			await this.pushNotificationApi.subscribe(this.subscription);
		}
	}

	public async sendNotification(notification: {
		message: string;
		options?: NotificationOptions;
	}): Promise<void> {
		if (!this.isInitialized) {
			await this.initialize();
		}

		if (!this.isGranted) {
			return;
		}

		await this.pushNotificationApi.sendNotification(notification);
	}
}

export { PushNotification };
