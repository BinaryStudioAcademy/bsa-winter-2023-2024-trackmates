import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { GroupsApiPath } from "./libs/enums/enums.js";
import {
	type GroupRequestDto,
	type GroupResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class GroupsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.GROUPS, storage });
	}

	public async createGroup(
		payload: GroupRequestDto,
	): Promise<GroupResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<GroupResponseDto>();
	}

	public async deleteGroup(groupId: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$GROUP_ID, {
				groupId: String(groupId),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async editGroup(
		groupId: number,
		payload: GroupRequestDto,
	): Promise<GroupResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$GROUP_ID, {
				groupId: String(groupId),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<GroupResponseDto>();
	}

	public async getAllGroups(): Promise<{ items: GroupResponseDto[] }> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<{ items: GroupResponseDto[] }>();
	}

	public async updateGroupPermissions(
		groupId: number,
		permissionId: number,
	): Promise<{ items: GroupResponseDto[] }> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$GROUP_ID_PERMISSIONS_$PERMISSION_ID, {
				groupId: String(groupId),
				permissionId: String(permissionId),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PUT",
			},
		);

		return await response.json<{ items: GroupResponseDto[] }>();
	}

	public async updateUserGroups(
		groupId: number,
		userId: number,
	): Promise<{ items: GroupResponseDto[] }> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$GROUP_ID_USERS_$USER_ID, {
				groupId: String(groupId),
				userId: String(userId),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PUT",
			},
		);

		return await response.json<{ items: GroupResponseDto[] }>();
	}
}

export { GroupsApi };
