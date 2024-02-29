import { logger } from "~/libs/modules/logger/logger.js";
import { notificationService } from "~/modules/notifications/notifications.js";
import { UserModel } from "~/modules/users/user.model.js";

import { FriendController } from "./friend.controller.js";
import { FriendRepository } from "./friend.repository.js";
import { FriendService } from "./friend.service.js";

const friendRepository = new FriendRepository(UserModel);
const friendService = new FriendService(friendRepository, notificationService);
const friendController = new FriendController(logger, friendService);

export { friendController, friendRepository };
export { FriendRepository } from "./friend.repository.js";
export {
	addFriendValidationSchema,
	friendIdParameterValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
