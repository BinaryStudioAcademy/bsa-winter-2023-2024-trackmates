import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { CourseSectionsApiPath } from "./libs/enums/enums.js";
import {
	type CourseSectionGetAllRequestDto,
	type CourseSectionGetAllResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CourseSectionsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.COURSE_SECTIONS, storage });
	}

	public async getAllByCourseId(
		query: CourseSectionGetAllRequestDto,
	): Promise<CourseSectionGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CourseSectionsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<CourseSectionGetAllResponseDto>();
	}
}

export { CourseSectionsApi };
