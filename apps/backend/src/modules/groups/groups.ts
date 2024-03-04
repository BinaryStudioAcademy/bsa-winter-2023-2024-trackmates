import { logger } from "~/libs/modules/logger/logger.js";
import { permissionService } from "~/modules/permissions/permissions.js";
import { UserModel, userService } from "~/modules/users/users.js";

import { GroupController } from "./group.controller.js";
import { GroupModel } from "./group.model.js";
import { GroupRepository } from "./group.repository.js";
import { GroupService } from "./group.service.js";

const groupRepository = new GroupRepository(GroupModel, UserModel);
const groupService = new GroupService(
	groupRepository,
	permissionService,
	userService,
);
const groupController = new GroupController(logger, groupService);

export { groupController };
export { type GroupEntity } from "./group.entity.js";
export { type GroupResponseDto } from "./libs/types/types.js";
