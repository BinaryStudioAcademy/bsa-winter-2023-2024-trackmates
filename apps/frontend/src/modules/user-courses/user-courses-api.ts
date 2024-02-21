import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UserCoursesApiPath } from "./libs/enums/enums.js";
import { type CoursesResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserCourseApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USER_COURSES, storage });
	}

	public async getAllByUserId(id: number): Promise<CoursesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(`${UserCoursesApiPath.ROOT}${id}`, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<CoursesResponseDto>();
	}
}

export { UserCourseApi };
