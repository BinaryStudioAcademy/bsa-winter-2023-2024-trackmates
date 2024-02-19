import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { FriendService } from "./friend.service.js";
import { FriendsApiPath } from "./libs/enums/enums.js";
import {
	type FriendAddNewRequestDto,
	type FriendReplyRequestDto,
} from "./libs/types/types.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     FriendRequest:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *         senderUserId:
 *           type: number
 *         id:
 *           type: number
 *         isInvitationAccepted:
 *           type: boolean
 *         recipientUserId:
 *           type: number
 *         updatedAt:
 *           type: string
 *     FriendError:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *         message:
 *           type: string
 *     FriendRequestWithUser:
 *       type: object
 *       properties:
 *         friendRequest:
 *           $ref: "#/components/schemas/FriendRequest"
 *         user:
 *           $ref: "#/components/schemas/User"
 *     UserWithFriendRelation:
 *       type: object
 *       properties:
 *         user:
 *           $ref: "#/components/schemas/User"
 *         friendRequest:
 *           $ref: "#/components/schemas/FriendRequest"
 */

class FriendController extends BaseController {
	private friendService: FriendService;

	public constructor(logger: Logger, friendService: FriendService) {
		super(logger, APIPath.FRIENDS);

		this.friendService = friendService;

		this.addRoute({
			handler: (options) =>
				this.getUserFriends(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.createFriendRequest(
					options as APIHandlerOptions<{
						body: FriendAddNewRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: FriendsApiPath.REQUEST,
		});
		this.addRoute({
			handler: (options) =>
				this.respondToFriendRequestt(
					options as APIHandlerOptions<{
						body: FriendReplyRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: FriendsApiPath.REPLY,
		});
		this.addRoute({
			handler: (options) =>
				this.searchFriendsByName(
					options as APIHandlerOptions<{
						query: {
							text: string;
						};
					}>,
				),
			method: "GET",
			path: FriendsApiPath.SEARCH,
		});
		this.addRoute({
			handler: (options) =>
				this.getPotentialFriends(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.GET_POTENTIAL_FRIENDS,
		});
	}

	/**
	 * @swagger
	 * /friend/request:
	 *    post:
	 *      description: Send friend invite and return this invite obj
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                receiverUserId:
	 *                  type: number
	 *                id:
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/FriendRequest"
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 * 				oneOf:
	 *              		- $ref: '#/components/schemas/FriendError'
	 * 					- type: null
	 */
	private async createFriendRequest(
		options: APIHandlerOptions<{
			body: FriendAddNewRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { id } = options.user;
		const { receiverUserId } = options.body;

		return {
			payload: await this.friendService.createFriendRequest(id, receiverUserId),
			status: HTTPCode.OK,
		};
	}

	private async getPotentialFriends(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.getPotentialFriends(options.user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend:
	 *    get:
	 *      description: Returns an array of FriendRequest with User and UserDetais
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/FriendRequestWithUser"
	 */
	private async getUserFriends(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { id } = options.user;

		return {
			payload: await this.friendService.getUserFriends(id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/reply:
	 *    post:
	 *      description: Reply to friend invite and return the invite obj or number of deleted invite obj-s
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                id:
	 *                  type: number
	 *                isAccepted:
	 *                  type: boolean
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    - $ref: "#/components/schemas/FriendRequest"
	 * 					  - type: number
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/FriendError'
	 */
	private async respondToFriendRequestt(
		options: APIHandlerOptions<{
			body: FriendReplyRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { id, isAccepted } = options.body;
		const { id: userId } = options.user;

		return {
			payload: await this.friendService.respondToFriendRequestt({
				id,
				isAccepted,
				userId,
			}),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/search:
	 *    get:
	 *      description: Search User by name
	 *      parameters:
	 *        - in: query
	 *          name: text
	 *          schema:
	 *            type: string
	 *          required: true
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/UserWithFriendRelation"
	 */
	private async searchFriendsByName(
		options: APIHandlerOptions<{
			query: {
				text: string;
			};
		}>,
	): Promise<APIHandlerResponse> {
		const { text } = options.query;

		const friends = await this.friendService.searchFriendsByName(text);

		return {
			payload: friends,
			status: HTTPCode.OK,
		};
	}
}

export { FriendController };
