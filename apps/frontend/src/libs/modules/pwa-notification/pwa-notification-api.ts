import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { PushNotificationsApiPath } from "./libs/enums/enums.js";
import { type PushNotificationRequestDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PWANotificationApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PUSH_NOTIFICATIONS, storage });
	}

	public async sendNotification(
		payload: PushNotificationRequestDto,
	): Promise<void> {
		await this.load(
			this.getFullEndpoint(PushNotificationsApiPath.SEND_NOTIFICATION, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);
	}

	public async subscribe(payload: PushSubscription): Promise<void> {
		await this.load(
			this.getFullEndpoint(PushNotificationsApiPath.SUBSCRIBE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);
	}
}

export { PWANotificationApi };
