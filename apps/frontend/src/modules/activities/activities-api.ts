import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
	type ValueOf,
} from "~/libs/types/types.js";
import { type ActivityLikeRequestDto } from "~/modules/activity-likes/activity-likes.js";

import { ActivitiesApiPath, type ActivityType } from "./libs/enums/enums.js";
import { type ActivityResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ActivitiesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.ACTIVITIES, storage });
	}

	public async getAll(
		payload: PaginationRequestDto,
	): Promise<
		PaginationResponseDto<ActivityResponseDto<ValueOf<typeof ActivityType>>>
	> {
		const response = await this.load(
			this.getFullEndpoint(ActivitiesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: {
					count: payload.count,
					page: payload.page,
				},
			},
		);

		return await response.json<
			PaginationResponseDto<ActivityResponseDto<ValueOf<typeof ActivityType>>>
		>();
	}

	public async likeActivity(
		payload: ActivityLikeRequestDto,
	): Promise<ActivityResponseDto<ValueOf<typeof ActivityType>>> {
		const response = await this.load(
			this.getFullEndpoint(ActivitiesApiPath.LIKE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<
			ActivityResponseDto<ValueOf<typeof ActivityType>>
		>();
	}
}

export { ActivitiesApi };
