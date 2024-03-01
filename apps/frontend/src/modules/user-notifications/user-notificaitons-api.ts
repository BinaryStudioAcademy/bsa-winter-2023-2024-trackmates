import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UserNotificationsApiPath } from "./libs/enums/enums.js";
import { type NotificationResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserNotificationsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USER_NOTIFICATIONS, storage });
	}

	public async getUserNotifications(): Promise<{
		items: NotificationResponseDto[];
	}> {
		const response = await this.load(
			this.getFullEndpoint(UserNotificationsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<{ items: NotificationResponseDto[] }>();
	}

	public async hasUserUnreadNotifications(): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(UserNotificationsApiPath.UNREAD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<boolean>();
	}
}

export { UserNotificationsApi };