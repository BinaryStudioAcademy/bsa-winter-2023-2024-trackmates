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
import {
	chatMessageCreateValidationSchema,
	chatMessageUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
			validation: {
				body: chatMessageCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findAll(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
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
			validation: {
				body: chatMessageUpdateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: Record<"messageId", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "DELETE",
			path: ChatMessagesApiPath.$MESSAGE_ID,
		});

		this.addRoute({
			handler: (options) => {
				return this.find(
					options as APIHandlerOptions<{
						params: Record<"messageId", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
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

	private async delete({
		params,
		user,
	}: APIHandlerOptions<{
		params: Record<"messageId", number>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.delete({
				id: params.messageId,
				userId: user.id,
			}),
			status: HTTPCode.OK,
		};
	}

	private async find({
		params,
	}: APIHandlerOptions<{
		params: Record<"messageId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.find(params.messageId),
			status: HTTPCode.OK,
		};
	}

	private async findAll({
		user,
	}: APIHandlerOptions<{
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.findAll(user.id),
			status: HTTPCode.OK,
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
