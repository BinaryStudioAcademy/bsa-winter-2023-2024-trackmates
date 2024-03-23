import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";

import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type CourseDto,
	type CourseSearchFilterDto,
	type CourseSearchGetAllResponseDto,
	type CourseUpdateRequestDto,
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

	public async deleteById(courseId: string): Promise<{ success: boolean }> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.$COURSE_ID, { courseId }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<{ success: boolean }>();
	}

	public async getAll(
		query: PaginationRequestDto,
	): Promise<PaginationResponseDto<CourseDto>> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<PaginationResponseDto<CourseDto>>();
	}

	public async getAllByVendor(
		filter: CourseSearchFilterDto,
	): Promise<CourseSearchGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.FROM_VENDORS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<CourseSearchGetAllResponseDto>();
	}
	public async getById(id: string): Promise<CourseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.$COURSE_ID, {
				courseId: id,
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
	): Promise<CourseSearchGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.RECOMMENDED, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<CourseSearchGetAllResponseDto>();
	}

	public async update(
		courseId: string,
		payload: CourseUpdateRequestDto,
	): Promise<CourseDto> {
		const response = await this.load(
			this.getFullEndpoint(CoursesApiPath.$COURSE_ID, {
				courseId,
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PUT",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<CourseDto>();
	}
}

export { CourseApi };
