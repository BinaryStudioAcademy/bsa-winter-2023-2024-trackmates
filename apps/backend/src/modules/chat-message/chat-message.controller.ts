import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ChatMessageService } from "./chat-message.service.js";
import { ChatMessageApiPath } from "./libs/enums/enums.js";
import { type MessageSendRequestDto } from "./libs/types/types.js";

class ChatMessageController extends BaseController {
	private chatMessageService: ChatMessageService;

	public constructor(logger: Logger, chatMessageService: ChatMessageService) {
		super(logger, APIPath.CHAT);

		this.chatMessageService = chatMessageService;

		this.addRoute({
			handler: (options) =>
				this.findAllMessagesByChatId(
					options as APIHandlerOptions<{
						params: Record<"chatId", string>;
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: ChatMessageApiPath.CHAT_ID,
		});

		this.addRoute({
			handler: (options) =>
				this.sendMessage(
					options as APIHandlerOptions<{
						body: MessageSendRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: ChatMessageApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.findAllChatsByUserId(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: ChatMessageApiPath.ROOT,
		});
	}

	private async findAllChatsByUserId({
		user: { id },
	}: APIHandlerOptions<{
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.findAllChatsByUserId(id),
			status: HTTPCode.OK,
		};
	}

	private async findAllMessagesByChatId({
		params: { chatId },
		user: { id },
	}: APIHandlerOptions<{
		params: Record<"chatId", string>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.findAllMessagesByChatId(
				chatId,
				id,
			),
			status: HTTPCode.OK,
		};
	}

	private async sendMessage({
		body,
		user: { id },
	}: APIHandlerOptions<{
		body: MessageSendRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.sendMessage(body, id),
			status: HTTPCode.CREATED,
		};
	}
}

export { ChatMessageController };
