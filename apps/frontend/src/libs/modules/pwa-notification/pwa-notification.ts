import { config } from "../config/config.js";
import { http } from "../http/http.js";
import { storage } from "../storage/storage.js";
import { PWANotification } from "./pwa-notification.module.js";
import { PWANotificationApi } from "./pwa-notification-api.js";

const pwaApi = new PWANotificationApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});
const pwaNotification = new PWANotification({
	publicKey: config.ENV.PUSH_NOTIFICATIONS.PUBLIC_KEY,
	pwaApi,
});

export { pwaNotification };
