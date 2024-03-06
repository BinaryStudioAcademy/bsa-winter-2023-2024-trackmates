import {
	APIPath,
	HTTPCode,
	PermissionKey,
	PermissionMode,
} from "~/libs/enums/enums.js";
import { checkUserPermissions } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { PermissionsApiPath } from "./libs/enums/enums.js";
import { permissionIdParameter } from "./libs/validation-schemas/validation-schemas.js";
import { type PermissionService } from "./permission.service.js";

class PermissionController extends BaseController {
	private permissionService: PermissionService;

	public constructor(logger: Logger, permissionService: PermissionService) {
		super(logger, APIPath.PERMISSIONS);
		this.permissionService = permissionService;

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
			preHandler: checkUserPermissions(
				[PermissionKey.MANAGE_UAM],
				PermissionMode.ALL_OF,
			),
			validation: {
				params: permissionIdParameter,
			},
		});

		this.addRoute({
			handler: () => {
				return this.findAll();
			},
			method: "GET",
			path: PermissionsApiPath.ROOT,
			preHandler: checkUserPermissions(
				[PermissionKey.MANAGE_UAM],
				PermissionMode.ALL_OF,
			),
		});
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
}

export { PermissionController };
