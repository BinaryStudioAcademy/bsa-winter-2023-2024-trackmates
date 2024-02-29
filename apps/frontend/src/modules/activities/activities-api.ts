import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ActivitiesApiPath } from "./libs/enums/enums.js";
import { type GetActivitiesResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ActivitiesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.ACTIVITIES, storage });
	}

	public async getActivities(): Promise<GetActivitiesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ActivitiesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<GetActivitiesResponseDto>();
	}
}

export { ActivitiesApi };
