import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UserNotificationsApiPath } from "./libs/enums/enums.js";
import {
	type AllNotificationsResponseDto,
	type NotificationResponseDto,
	type ReadNotificationsRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserNotificationsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USER_NOTIFICATIONS, storage });
	}

	public async checkHasUserUnreadNotifications(): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(
				UserNotificationsApiPath.CHECK_HAS_USER_UNREAD_NOTIFICATIONS,
				{},
			),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<boolean>();
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

	public async setReadNotifications(
		payload: ReadNotificationsRequestDto,
	): Promise<AllNotificationsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UserNotificationsApiPath.READ_NOTIFICATIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<AllNotificationsResponseDto>();
	}
}

export { UserNotificationsApi };