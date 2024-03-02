import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { PermissionsApiPath } from "./libs/enums/enums.js";
import { type PermissionRequestDto } from "./libs/types/types.js";
import { type PermissionService } from "./permission.service.js";

class PermissionController extends BaseController {
	private permissionService: PermissionService;

	public constructor(logger: Logger, permissionService: PermissionService) {
		super(logger, APIPath.PERMISSIONS);
		this.permissionService = permissionService;

		this.addRoute({
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: PermissionRequestDto;
					}>,
				);
			},
			method: "POST",
			path: PermissionsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: Record<"permissionId", number>;
					}>,
				);
			},
			method: "DELETE",
			path: PermissionsApiPath.$PERMISSION_ID,
		});

		this.addRoute({
			handler: (options) => {
				return this.find(
					options as APIHandlerOptions<{
						params: Record<"permissionId", number>;
					}>,
				);
			},
			method: "GET",
			path: PermissionsApiPath.$PERMISSION_ID,
		});

		this.addRoute({
			handler: () => {
				return this.findAll();
			},
			method: "GET",
			path: PermissionsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: PermissionRequestDto;
						params: Record<"permissionId", number>;
					}>,
				);
			},
			method: "PATCH",
			path: PermissionsApiPath.$PERMISSION_ID,
		});
	}

	private async create({
		body,
	}: APIHandlerOptions<{
		body: PermissionRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.create(body),
			status: HTTPCode.CREATED,
		};
	}

	private async delete({
		params,
	}: APIHandlerOptions<{
		params: Record<"permissionId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.delete(params.permissionId),
			status: HTTPCode.OK,
		};
	}

	private async find({
		params,
	}: APIHandlerOptions<{
		params: Record<"permissionId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.find(params.permissionId),
			status: HTTPCode.OK,
		};
	}

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.findAll(),
			status: HTTPCode.OK,
		};
	}

	private async update({
		body,
		params,
	}: APIHandlerOptions<{
		body: PermissionRequestDto;
		params: Record<"permissionId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.update(params.permissionId, body),
			status: HTTPCode.OK,
		};
	}
}

export { PermissionController };
