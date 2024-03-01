import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { SectionStatusesApiPath } from "./libs/enums/enums.js";
import {
	type SectionStatusAddRequestDto,
	type SectionStatusGetAllRequestDto,
	type SectionStatusGetAllResponseDto,
	type SectionStatusResponseDto,
	type SectionStatusUpdateRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class SectionStatusApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.SECTION_STATUSES, storage });
	}

	public async create(
		payload: SectionStatusAddRequestDto,
	): Promise<SectionStatusResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(SectionStatusesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<SectionStatusResponseDto>();
	}

	public async getAllByCourseIdAndUserId(
		query: SectionStatusGetAllRequestDto,
	): Promise<SectionStatusGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(SectionStatusesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<SectionStatusGetAllResponseDto>();
	}

	public async updateStatus(
		id: number,
		payload: SectionStatusUpdateRequestDto,
	): Promise<SectionStatusResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(`${SectionStatusesApiPath.ROOT}${id}`, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<SectionStatusResponseDto>();
	}
}

export { SectionStatusApi };
