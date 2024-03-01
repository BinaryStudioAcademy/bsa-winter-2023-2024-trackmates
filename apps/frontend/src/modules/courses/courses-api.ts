import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type CourseDto,
	type CourseSearchFilterDto,
	type CoursesResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CourseApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.COURSES, storage });
	}

	public async getAll(
		filter: CourseSearchFilterDto,
	): Promise<CoursesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<CoursesResponseDto>();
	}
	public async getById(id: number): Promise<CourseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.$COURSE_ID, {
				courseId: String(id),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<CourseDto>();
	}

	public async getRecommended(
		filter: CourseSearchFilterDto,
	): Promise<CoursesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.RECOMMENDED, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<CoursesResponseDto>();
	}
}

export { CourseApi };
