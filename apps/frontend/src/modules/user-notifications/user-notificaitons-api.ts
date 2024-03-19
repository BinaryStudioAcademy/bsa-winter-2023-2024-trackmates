import {
	APIPath,
	ContentType,
	NotificationFilter,
} from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ValueOf } from "~/libs/types/types.js";

import { UserNotificationsApiPath } from "./libs/enums/enums.js";
import {
	type AllNotificationsResponseDto,
	type NotificationResponseDto,
	type ReadNotificationsRequestDto,
	type ReadNotificationsResponseDto,
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

	public async getUnreadNotificationsCount(): Promise<number> {
		const response = await this.load(
			this.getFullEndpoint(UserNotificationsApiPath.UNREAD_COUNT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<number>();
	}

	public async getUserNotifications({
		search = "",
		type,
	}: {
		search: string | undefined;
		type: ValueOf<typeof NotificationFilter> | null;
	}): Promise<AllNotificationsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UserNotificationsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: {
					search,
					type: type ?? NotificationFilter.ALL,
				},
			},
		);

		return await response.json<{ items: NotificationResponseDto[] }>();
	}

	public async setReadNotifications(
		payload: ReadNotificationsRequestDto,
	): Promise<ReadNotificationsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UserNotificationsApiPath.READ_NOTIFICATIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ReadNotificationsResponseDto>();
	}
}

export { UserNotificationsApi };
