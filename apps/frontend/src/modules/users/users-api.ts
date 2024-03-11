import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async getAll(): Promise<{ items: UserAuthResponseDto[] }> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<{ items: UserAuthResponseDto[] }>();
	}

	public async getById(id: number): Promise<UserAuthResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, {
				id: String(id),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserAuthResponseDto>();
	}

	public async remove(id: number): Promise<{ success: boolean }> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, { id: String(id) }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<{ success: boolean }>();
	}

	public async update(
		id: number,
		payload: UserProfileRequestDto,
	): Promise<UserAuthResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserAuthResponseDto>();
	}
}

export { UserApi };
