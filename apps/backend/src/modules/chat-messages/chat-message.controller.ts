import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ChatMessageService } from "./chat-message.service.js";
import { ChatMessagesApiPath } from "./libs/enums/enums.js";
import { type ChatMessageCreateRequestDto } from "./libs/types/types.js";

class ChatMessageController extends BaseController {
	private chatMessageService: ChatMessageService;

	public constructor(logger: Logger, chatMessageService: ChatMessageService) {
		super(logger, APIPath.CHAT_MESSAGES);
		this.chatMessageService = chatMessageService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: ChatMessageCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: ChatMessagesApiPath.ROOT,
		});
	}

	private async create({
		body,
		user,
	}: APIHandlerOptions<{
		body: ChatMessageCreateRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.create({
				messageData: body,
				userId: user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}
}

export { ChatMessageController };
