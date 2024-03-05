import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PaginationResponseDto } from "~/libs/types/types.js";

import { UserCoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type CourseGetAllByUserRequestDto,
	type UserCourseResponseDto,
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

	public async add(
		payload: AddCourseRequestDto,
	): Promise<UserCourseResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UserCoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserCourseResponseDto>();
	}

	public async getAllByUserId({
		count,
		page,
		search,
		userId,
	}: CourseGetAllByUserRequestDto): Promise<
		PaginationResponseDto<UserCourseResponseDto>
	> {
		const response = await this.load(
			this.getFullEndpoint(UserCoursesApiPath.$USER_ID, {
				userId: String(userId),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: {
					count,
					page,
					search,
				},
			},
		);

		return await response.json<PaginationResponseDto<UserCourseResponseDto>>();
	}
}

export { UserCourseApi };
