import { logger } from "~/libs/modules/logger/logger.js";
import { UserModel } from "~/modules/users/user.model.js";

import { FriendController } from "./friend.controller.js";
import { FriendRepository } from "./friend.repository.js";
import { FriendService } from "./friend.service.js";

const friendRepository = new FriendRepository(UserModel);
const friendService = new FriendService(friendRepository);
const friendController = new FriendController(logger, friendService);

export { friendController };
export {
	FriendRequestParametersValidationSchema,
	FriendRequestValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
