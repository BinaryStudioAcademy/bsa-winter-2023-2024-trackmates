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
	chatMessageIdParameterValidationSchema,
	chatMessageUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatMessage:
 *       type: object
 *       properties:
 *         chatId:
 *           type: number
 *           minimum: 1
 *         createdAt:
 *           type: string
 *         id:
 *           type: number
 *           minimum: 1
 *         senderUser:
 *           type: object
 *           $ref: "#/components/schemas/User"
 *         status:
 *           type: string
 *           enum: [read, unread]
 *         text:
 *           type: string
 *           minLength: 1
 *           maxLength: 512
 *         updatedAt:
 *           type: string
 */
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
				params: chatMessageIdParameterValidationSchema,
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
			validation: {
				params: chatMessageIdParameterValidationSchema,
			},
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
			validation: {
				params: chatMessageIdParameterValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /chat-messages:
	 *    post:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Create a new message
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                chatId:
	 *                  type: number
	 *                  minimum: 1
	 *                text:
	 *                  type: string
	 *                  minLength: 1
	 *                  maxLength: 512
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/ChatMessage"
	 */
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

	/**
	 * @swagger
	 * /chat-messages/{id}:
	 *    delete:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Delete message by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The message id
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
	 *                type: boolean
	 */
	private async delete({
		params,
	}: APIHandlerOptions<{
		params: Record<"messageId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.chatMessageService.delete(params.messageId),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /chat-messages/{id}:
	 *    get:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Find message by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The message id
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
	 *                $ref: "#/components/schemas/ChatMessage"
	 */
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

	/**
	 * @swagger
	 * /chat-messages:
	 *    get:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Find all user's messages
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

	/**
	 * @swagger
	 * /chat-messages/{id}:
	 *    patch:
	 *      security:
	 *        - bearerAuth: []
	 *      description: Update message by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The message id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                text:
	 *                  type: string
	 *                  minLength: 1
	 *                  maxLength: 512
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/ChatMessage"
	 */
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
