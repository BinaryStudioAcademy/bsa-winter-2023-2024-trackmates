import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { CommentsApiPath } from "./libs/enums/enums.js";
import {
	type CommentCreateRequestDto,
	type CommentGetAllRequestDto,
	type CommentGetAllResponseDto,
	type CommentWithRelationsResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CommentApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.COMMENTS, storage });
	}

	public async create(
		payload: CommentCreateRequestDto,
	): Promise<CommentWithRelationsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CommentsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<CommentWithRelationsResponseDto>();
	}

	public async getAllByActivityId(
		query: CommentGetAllRequestDto,
	): Promise<CommentGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CommentsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<CommentGetAllResponseDto>();
	}
}

export { CommentApi };
