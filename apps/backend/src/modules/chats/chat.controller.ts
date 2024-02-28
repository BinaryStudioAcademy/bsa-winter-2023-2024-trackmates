import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ChatService } from "./chat.service.js";
import { ChatsApiPath } from "./libs/enums/enums.js";
import { type ChatCreateRequestDto } from "./libs/types/types.js";
import { chatCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *         firstUser:
 *           type: object
 *           $ref: "#/components/schemas/User"
 *         id:
 *           type: number
 *         messages:
 *           type: array
 *           items:
 *             type: object
 *             $ref: "#/components/schemas/ChatMessage"
 *         secondUser:
 *           type: object
 *           $ref: "#/components/schemas/User"
 *         updatedAt:
 *           type: string
 */
class ChatController extends BaseController {
	private chatService: ChatService;

	public constructor(logger: Logger, chatService: ChatService) {
		super(logger, APIPath.CHATS);
		this.chatService = chatService;

		this.addRoute({
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: ChatCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: ChatsApiPath.ROOT,
			validation: {
				body: chatCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findWithMessage(
					options as APIHandlerOptions<{
						params: Record<"chatId", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: ChatsApiPath.$CHAT_ID,
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
			path: ChatsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: Record<"chatId", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "DELETE",
			path: ChatsApiPath.$CHAT_ID,
		});
	}

	/**
	 * @swagger
	 * /chats:
	 *    post:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Create a new chat or get existing
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                userId:
	 *                  type: number
	 *                  minimum: 1
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  id:
	 *                    type: number
	 *                  interlocutor:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 *                  messages:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      $ref: "#/components/schemas/ChatMessage"
	 */
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

	/**
	 * @swagger
	 * /chats/{id}:
	 *    delete:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Delete chat by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The chat id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  success:
	 *                    type: boolean
	 */
	private async delete({
		params,
		user,
	}: APIHandlerOptions<{
		params: Record<"chatId", number>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatService.delete({
				id: params.chatId,
				userId: user.id,
			}),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /chats:
	 *    get:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Get all user's chats
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  createdAt:
	 *                    type: string
	 *                  id:
	 *                    type: number
	 *                  interlocutor:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 *                  lastMessage:
	 *                    type: object
	 *                    $ref: "#/components/schemas/ChatMessage"
	 *                  unreadMessageCount:
	 *                    type: number
	 *                  updatedAt:
	 *                    type: string
	 */
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

	/**
	 * @swagger
	 * /chats/{id}:
	 *    get:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Find chat by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The chat id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  id:
	 *                    type: number
	 *                  interlocutor:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 *                  messages:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      $ref: "#/components/schemas/ChatMessage"
	 */
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
