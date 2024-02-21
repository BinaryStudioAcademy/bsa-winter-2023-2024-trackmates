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
import {
	chatMessageSendValidationSchema,
	chatParametersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      ChatMessage:
 *        type: object
 *        properties:
 *          chatId:
 *            type: string
 *          id:
 *            type: number
 *            minimum: 1
 *          message:
 *            type: string
 *          receiverUser:
 *            type: object
 *            $ref: "#/components/schemas/User"
 *          senderUser:
 *            type: object
 *            $ref: "#/components/schemas/User"
 *          status:
 *            type: string
 *      Chat:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          interlocutor:
 *            type: object
 *            $ref: "#/components/schemas/User"
 *          lastMessage:
 *            type: object
 *            $ref: "#/components/schemas/ChatMessage"
 *          unreadMessageCount:
 *            type: number
 */
class ChatMessageController extends BaseController {
	private chatMessageService: ChatMessageService;

	public constructor(logger: Logger, chatMessageService: ChatMessageService) {
		super(logger, APIPath.CHATS);

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
			path: ChatMessageApiPath.$CHAT_ID,
			validation: {
				params: chatParametersValidationSchema,
			},
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
			validation: {
				body: chatMessageSendValidationSchema,
			},
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

	/**
	 * @swagger
	 * /chats:
	 *    get:
	 *      description: Return all user's chats
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  items:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      $ref: "#/components/schemas/Chat"
	 */
	private async findAllChatsByUserId({
		user,
	}: APIHandlerOptions<{
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.findAllChatsByUserId(user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /chats/{chatId}:
	 *    get:
	 *      description: Return all chat's messages
	 *      parameters:
	 *        - name: chatId
	 *          in: params
	 *          type: uuid
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  items:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      $ref: "#/components/schemas/ChatMessage"
	 */
	private async findAllMessagesByChatId({
		params,
		user,
	}: APIHandlerOptions<{
		params: Record<"chatId", string>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.findAllMessagesByChatId(
				params.chatId,
				user.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /chats:
	 *    post:
	 *      description: Create a new message
	 *      requestBody:
	 *        description: Message data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                receiverId:
	 *                  type: number
	 *                  minimum: 1
	 *                message:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/ChatMessage"
	 */
	private async sendMessage({
		body,
		user,
	}: APIHandlerOptions<{
		body: MessageSendRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.sendMessage(body, user.id),
			status: HTTPCode.CREATED,
		};
	}
}

export { ChatMessageController };
