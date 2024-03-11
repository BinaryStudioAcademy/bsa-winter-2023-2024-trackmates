import { config } from "../config/config.js";
import { http } from "../http/http.js";
import { storage } from "../storage/storage.js";
import { PushNotification } from "./push-notification.module.js";
import { PushNotificationApi } from "./push-notification-api.js";

const pushNotificationApi = new PushNotificationApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});
const pushNotification = new PushNotification({
	publicKey: config.ENV.PUSH_NOTIFICATIONS.PUBLIC_KEY,
	pushNotificationApi,
});

export { pushNotification };
