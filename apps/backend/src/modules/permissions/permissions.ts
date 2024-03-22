import { logger } from "~/libs/modules/logger/logger.js";

import { PermissionController } from "./permission.controller.js";
import { PermissionModel } from "./permission.model.js";
import { PermissionRepository } from "./permission.repository.js";
import { PermissionService } from "./permission.service.js";

const permissionRepository = new PermissionRepository(PermissionModel);
const permissionService = new PermissionService(permissionRepository);
const permissionController = new PermissionController(
	logger,
	permissionService,
);

export { permissionController, permissionRepository };
export {
	type PermissionResponseDto,
	type PermissionsGetAllResponseDto,
} from "./libs/types/types.js";
export { PermissionEntity } from "./permission.entity.js";
export { PermissionModel } from "./permission.model.js";
export { type PermissionRepository } from "./permission.repository.js";
