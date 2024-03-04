import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type GroupService } from "./group.service.js";
import { GroupsApiPath } from "./libs/enums/enums.js";
import { type GroupRequestDto } from "./libs/types/types.js";

class GroupController extends BaseController {
	private groupService: GroupService;

	public constructor(logger: Logger, groupService: GroupService) {
		super(logger, APIPath.GROUPS);
		this.groupService = groupService;

		this.addRoute({
			handler: (options) => {
				return this.addPermissionToGroup(
					options as APIHandlerOptions<{
						params: { groupId: number; permissionId: number };
					}>,
				);
			},
			method: "PUT",
			path: GroupsApiPath.$GROUP_ID_PERMISSIONS_$PERMISSION_ID,
		});

		this.addRoute({
			handler: (options) => {
				return this.addUserToGroup(
					options as APIHandlerOptions<{
						params: { groupId: number; userId: number };
					}>,
				);
			},
			method: "PUT",
			path: GroupsApiPath.$GROUP_ID_USERS_$USER_ID,
		});

		this.addRoute({
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: GroupRequestDto;
					}>,
				);
			},
			method: "POST",
			path: GroupsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "DELETE",
			path: GroupsApiPath.$GROUP_ID,
		});

		this.addRoute({
			handler: (options) => {
				return this.find(
					options as APIHandlerOptions<{
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "GET",
			path: GroupsApiPath.$GROUP_ID,
		});

		this.addRoute({
			handler: (options) => {
				return this.findAllByQuery(
					options as APIHandlerOptions<{
						query: Record<"userId", number>;
					}>,
				);
			},
			method: "GET",
			path: GroupsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.findAllPermissionsInGroup(
					options as APIHandlerOptions<{
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "GET",
			path: GroupsApiPath.$GROUP_ID_PERMISSIONS,
		});

		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: GroupRequestDto;
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "PATCH",
			path: GroupsApiPath.$GROUP_ID,
		});
	}

	private async addPermissionToGroup({
		params,
	}: APIHandlerOptions<{
		params: { groupId: number; permissionId: number };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.addPermissionToGroup(
				params.groupId,
				params.permissionId,
			),
			status: HTTPCode.OK,
		};
	}

	private async addUserToGroup({
		params,
	}: APIHandlerOptions<{
		params: { groupId: number; userId: number };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.addUserToGroup(
				params.groupId,
				params.userId,
			),
			status: HTTPCode.OK,
		};
	}

	private async create({
		body,
	}: APIHandlerOptions<{
		body: GroupRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.create(body),
			status: HTTPCode.CREATED,
		};
	}

	private async delete({
		params,
	}: APIHandlerOptions<{
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.delete(params.groupId),
			status: HTTPCode.OK,
		};
	}

	private async find({
		params,
	}: APIHandlerOptions<{
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.find(params.groupId),
			status: HTTPCode.OK,
		};
	}

	private async findAllByQuery({
		query,
	}: APIHandlerOptions<{
		query: Record<"userId", number>;
	}>): Promise<APIHandlerResponse> {
		const hasUserId = Boolean(query.userId);
		const payload = hasUserId
			? await this.groupService.findAllUserGroups(query.userId)
			: await this.groupService.findAll();

		return {
			payload,
			status: HTTPCode.OK,
		};
	}

	private async findAllPermissionsInGroup({
		params,
	}: APIHandlerOptions<{
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.findAllPermissionsInGroup(
				params.groupId,
			),
			status: HTTPCode.OK,
		};
	}

	private async update({
		body,
		params,
	}: APIHandlerOptions<{
		body: GroupRequestDto;
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.update(params.groupId, body),
			status: HTTPCode.OK,
		};
	}
}

export { GroupController };
