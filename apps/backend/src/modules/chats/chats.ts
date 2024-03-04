import { logger } from "~/libs/modules/logger/logger.js";
import { userRepository } from "~/modules/users/users.js";

import { ChatController } from "./chat.controller.js";
import { ChatModel } from "./chat.model.js";
import { ChatRepository } from "./chat.repository.js";
import { ChatService } from "./chat.service.js";

const chatRepository = new ChatRepository(ChatModel);
const chatService = new ChatService(chatRepository, userRepository);
const chatController = new ChatController(logger, chatService);

export { chatController, chatService };
export { type ChatService } from "./chat.service.js";
export { ChatError } from "./libs/exceptions/exceptions.js";
