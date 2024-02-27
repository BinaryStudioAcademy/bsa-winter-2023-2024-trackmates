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
import {
	type ChatMessageCreateRequestDto,
	type ChatMessageUpdateRequestDto,
} from "./libs/types/types.js";

class ChatMessageController extends BaseController {
	private chatMessageService: ChatMessageService;

	public constructor(logger: Logger, chatMessageService: ChatMessageService) {
		super(logger, APIPath.CHAT_MESSAGES);
		this.chatMessageService = chatMessageService;

		this.addRoute({
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: ChatMessageCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: ChatMessagesApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: ChatMessageUpdateRequestDto;
						params: Record<"messageId", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "PATCH",
			path: ChatMessagesApiPath.$MESSAGE_ID,
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

	private async update({
		body,
		params,
		user,
	}: APIHandlerOptions<{
		body: ChatMessageUpdateRequestDto;
		params: Record<"messageId", number>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.update(params.messageId, {
				updateMessageData: body,
				userId: user.id,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { ChatMessageController };