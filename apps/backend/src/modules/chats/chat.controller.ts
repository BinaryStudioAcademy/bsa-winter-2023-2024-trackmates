import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { ChatService } from "./chat.service.js";
import { ChatsApiPath } from "./libs/enums/enums.js";
import { type ChatCreateRequestDto } from "./libs/types/types.js";

class ChatController extends BaseController {
	private chatService: ChatService;

	public constructor(logger: Logger, chatService: ChatService) {
		super(logger, APIPath.CHATS);
		this.chatService = chatService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: ChatCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: ChatsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.findWithMessage(
					options as APIHandlerOptions<{
						params: Record<"chatId", number>;
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: ChatsApiPath.$CHAT_ID,
		});

		this.addRoute({
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: ChatsApiPath.ROOT,
		});
	}

	private async create({
		body,
		user,
	}: APIHandlerOptions<{
		body: ChatCreateRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatService.create({
				chatData: body,
				userId: user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}

	private async findAll({
		user,
	}: APIHandlerOptions<{
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatService.findAll(user.id),
			status: HTTPCode.OK,
		};
	}

	private async findWithMessage({
		params,
		user,
	}: APIHandlerOptions<{
		params: Record<"chatId", number>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatService.findWithMessages({
				id: params.chatId,
				userId: user.id,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { ChatController };
