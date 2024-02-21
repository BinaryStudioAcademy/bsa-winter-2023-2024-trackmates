import { logger } from "~/libs/modules/logger/logger.js";

import { userRepository } from "../users/users.js";
import { ChatMessageController } from "./chat-message.controller.js";
import { ChatMessageModel } from "./chat-message.model.js";
import { ChatMessageRepository } from "./chat-message.repository.js";
import { ChatMessageService } from "./chat-message.service.js";

const chatMessageRepository = new ChatMessageRepository(ChatMessageModel);

const chatMessageService = new ChatMessageService(
	chatMessageRepository,
	userRepository,
);

const chatMessageController = new ChatMessageController(
	logger,
	chatMessageService,
);

export { chatMessageController };
