import { logger } from "~/libs/modules/logger/logger.js";
import { chatService } from "~/modules/chats/chats.js";
import { userRepository } from "~/modules/users/users.js";

import { ChatMessageController } from "./chat-message.controller.js";
import { ChatMessageModel } from "./chat-message.model.js";
import { ChatMessageRepository } from "./chat-message.repository.js";
import { ChatMessageService } from "./chat-message.service.js";

const chatMessageRepository = new ChatMessageRepository(ChatMessageModel);

const chatMessageService = new ChatMessageService({
	chatMessageRepository,
	chatService,
	userRepository,
});
const chatMessageController = new ChatMessageController(
	logger,
	chatMessageService,
);

export { chatMessageController };
export { ChatMessageEntity } from "./chat-message.entity.js";
export { MessageStatus } from "./libs/enums/enums.js";
