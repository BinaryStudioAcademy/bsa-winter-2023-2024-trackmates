import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type CourseDto,
	type CourseSearchRequestDto,
	type CourseSearchResponseDto,
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

	public async add(payload: AddCourseRequestDto): Promise<null> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<null>();
	}
	public async getAll(): Promise<CourseDto[]> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<CourseDto[]>();
	}
	public async search(
		payload: CourseSearchRequestDto,
	): Promise<CourseSearchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<CourseSearchResponseDto>();
	}
}

export { CourseApi };
