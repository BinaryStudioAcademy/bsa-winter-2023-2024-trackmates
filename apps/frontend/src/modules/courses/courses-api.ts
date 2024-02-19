import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { CoursesApiPath, UserCoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type CourseDto,
	type CourseSearchFilterDto,
	type CourseSearchResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CourseApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: "", storage });
	}

	public async add(payload: AddCourseRequestDto): Promise<CourseDto> {
		const response = await this.load(
			this.getFullEndpoint(`${APIPath.COURSES}${CoursesApiPath.ROOT}`, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<CourseDto>();
	}
	public async getAll(id: number): Promise<CourseSearchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(
				`${APIPath.USER_COURSES}${UserCoursesApiPath.ROOT}${id}`,
				{},
			),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<CourseSearchResponseDto>();
	}
	public async search(
		filter: CourseSearchFilterDto,
	): Promise<CourseSearchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(`${APIPath.COURSES}${CoursesApiPath.ROOT}`, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<CourseSearchResponseDto>();
	}
}

export { CourseApi };
