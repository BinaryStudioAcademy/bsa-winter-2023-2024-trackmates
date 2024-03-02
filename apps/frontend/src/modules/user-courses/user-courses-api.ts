import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UserCoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type UserCourseDto,
	type UserCoursesResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserCourseApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USER_COURSES, storage });
	}

	public async add(payload: AddCourseRequestDto): Promise<UserCourseDto> {
		const response = await this.load(
			this.getFullEndpoint(UserCoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserCourseDto>();
	}

	public async getAllByUserId({
		id,
		search,
	}: {
		id: number;
		search: string;
	}): Promise<UserCoursesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(`${UserCoursesApiPath.ROOT}${id}`, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: {
					search,
				},
			},
		);

		return await response.json<UserCoursesResponseDto>();
	}
}

export { UserCourseApi };
