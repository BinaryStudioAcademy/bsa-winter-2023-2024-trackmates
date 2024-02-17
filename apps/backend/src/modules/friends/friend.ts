import { logger } from "~/libs/modules/logger/logger.js";
import { FriendModel } from "~/modules/friends/friend.model.js";

import { FriendController } from "./friend.controller.js";
import { FriendRepository } from "./friend.repository.js";
import { FriendService } from "./friend.service.js";

const friendRepository = new FriendRepository(FriendModel);
const friendService = new FriendService(friendRepository);
const friendController = new FriendController(logger, friendService);

export { friendController };
export { friendService };
