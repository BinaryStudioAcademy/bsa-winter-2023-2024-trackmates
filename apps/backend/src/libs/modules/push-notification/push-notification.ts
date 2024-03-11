import { config } from "../config/config.js";
import { PushNotification } from "./push-notification.module.js";

const pushNotification = new PushNotification({
	privateKey: config.ENV.PUSH_NOTIFICATIONS.PRIVATE_KEY,
	publicKey: config.ENV.PUSH_NOTIFICATIONS.PUBLIC_KEY,
	subject: config.ENV.PUSH_NOTIFICATIONS.SUBJECT,
});

export { pushNotification };
export { type PushNotification } from "./push-notification.module.js";
