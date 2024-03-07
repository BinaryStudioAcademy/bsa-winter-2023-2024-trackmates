import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UserNotificationsApi } from "./user-notificaitons-api.js";

const userNotificationsApi = new UserNotificationsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { userNotificationsApi };
export { type NotificationResponseDto } from "./libs/types/types.js";
export { actions, reducer } from "./slices/user-notifications.js";
