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

export { permissionController, permissionService };
export { type PermissionResponseDto } from "./libs/types/types.js";
export { PermissionModel } from "./permission.model.js";
export { type PermissionService } from "./permission.service.js";
