import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import { type PermissionsGetAllResponseDto } from "~/modules/permissions/permissions.js";

import { GroupsApiPath } from "./libs/enums/enums.js";
import {
	type GroupCreateRequestDto,
	type GroupResponseDto,
	type GroupsGetAllResponseDto,
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
		payload: GroupCreateRequestDto,
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
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async getAllGroups(
		query: PaginationRequestDto,
	): Promise<PaginationResponseDto<GroupResponseDto>> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json<PaginationResponseDto<GroupResponseDto>>();
	}

	public async updateGroupPermissions(
		groupId: number,
		permissionId: number,
	): Promise<PermissionsGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$GROUP_ID_PERMISSIONS_$PERMISSION_ID, {
				groupId: String(groupId),
				permissionId: String(permissionId),
			}),
			{
				hasAuth: true,
				method: "PUT",
			},
		);

		return await response.json<PermissionsGetAllResponseDto>();
	}

	public async updateUserGroups(
		groupId: number,
		userId: number,
	): Promise<GroupsGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$GROUP_ID_USERS_$USER_ID, {
				groupId: String(groupId),
				userId: String(userId),
			}),
			{
				hasAuth: true,
				method: "PUT",
			},
		);

		return await response.json<GroupsGetAllResponseDto>();
	}
}

export { GroupsApi };
