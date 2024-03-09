import { GRANTED_PERMISSION } from "./libs/constants/constants.js";

class PWANotification {
	private isGranted!: boolean;
	private swRegistration!: ServiceWorkerRegistration;

	private checkIsSupported(): boolean {
		return "serviceWorker" in navigator && "PushManager" in window;
	}

	public async initialize(): Promise<void> {
		this.swRegistration = await navigator.serviceWorker.register("/sw.js");

		if (!this.checkIsSupported()) {
			this.isGranted = false;

			return;
		}

		const response = await Notification.requestPermission();
		this.isGranted = response === GRANTED_PERMISSION;
	}

	public sendNotification(
		message: string,
		options?: NotificationOptions,
	): void {
		if (!this.isGranted) {
			return;
		}

		void this.swRegistration.showNotification(message, options);
	}
}

export { PWANotification };
