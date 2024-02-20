import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { FriendRequestValidationSchema } from "./friend.js";
import { FriendService } from "./friend.service.js";
import { FriendApiPath } from "./libs/enums/enums.js";
import { type FriendFollowingRequestDto } from "./libs/types/types.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     FriendFollowSuccesResponseDto:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *         senderUserId:
 *           type: number
 *         id:
 *           type: number
 *         isFollowing:
 *           type: boolean
 *         recipientUserId:
 *           type: number
 *         updatedAt:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         createdAt:
 * 			  type: string;
 *         email:
 *			  type string;
 *         firstName:
 *			  type string;
 *         id:
 *			  type number;
 *         lastName:
 *			  type string;
 *         updatedAt:
 *			  type string;
 *     FollowError:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *         message:
 *           type: string
 */

class FriendController extends BaseController {
	private friendService: FriendService;

	public constructor(logger: Logger, friendService: FriendService) {
		super(logger, APIPath.FRIENDS);

		this.friendService = friendService;

		this.addRoute({
			handler: (options) =>
				this.createSubscribe(
					options as APIHandlerOptions<{
						body: FriendFollowingRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: FriendApiPath.FOLLOW,
			validation: {
				body: FriendRequestValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.deleteSubscribe(
					options as APIHandlerOptions<{
						body: FriendFollowingRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "DELETE",
			path: FriendApiPath.UNFOLLOW,
			validation: {
				body: FriendRequestValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.getUserFollowers(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendApiPath.FOLLOWERS,
		});

		this.addRoute({
			handler: (options) =>
				this.getUserFollowings(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendApiPath.FOLLOWINGS,
		});
		this.addRoute({
			handler: (options) =>
				this.getPotentialFollowers(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.searchUserByName(
					options as APIHandlerOptions<{
						query: {
							filter: string;
							text: string;
							user: UserAuthResponseDto;
						};
					}>,
				),
			method: "GET",
			path: FriendApiPath.SEARCH,
		});
	}

	/**
	 * @swagger
	 * /friend/follow:
	 *    post:
	 *      description: Create follow relation and return this follow obj
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                id:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/FriendFollowSuccesResponseDto"
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 * 				oneOf:
	 *              	- $ref: '#/components/schemas/FriendError'
	 * 					- type: null
	 */
	private async createSubscribe(
		options: APIHandlerOptions<{
			body: FriendFollowingRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.createSubscribe(
				options.user.id,
				options.body.id,
			),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /friend/unfollow:
	 *    post:
	 *      description: deleted a subscribe
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
	 *                    description: Indicates whether the unsubscribe operation was successful (true) or not (false).
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/FriendError'
	 */
	private async deleteSubscribe(
		options: APIHandlerOptions<{
			body: FriendFollowingRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.deleteSubscribe(
				options.body.id,
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend:
	 *    get:
	 *      description: Returns an array of User that the user does not follow
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 */
	private async getPotentialFollowers(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.getPotentialFollowers(options.user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/followers:
	 *    get:
	 *      description: Returns an array of User that the user is followed by
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 */
	private async getUserFollowers(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.getUserFollowers(options.user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/followings:
	 *    get:
	 *      description: Returns an array of User that the user is following
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 */
	private async getUserFollowings(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.getUserFollowings(options.user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/search:
	 *    get:
	 *      description: Search User by name with current filter
	 *      parameters:
	 *        - in: query
	 *          name: text
	 *          schema:
	 *            type: string
	 *          required: true
	 *        - in: query
	 *          name: filter
	 *          schema:
	 *            type: string
	 *          required: false
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
	 */
	private async searchUserByName(
		options: APIHandlerOptions<{
			query: {
				filter: string;
				text: string;
				user: UserAuthResponseDto;
			};
		}>,
	): Promise<APIHandlerResponse> {
		const { filter, text, user } = options.query;

		const friends = await this.friendService.searchUserByName({
			filter,
			id: user.id,
			value: text,
		});

		return {
			payload: friends,
			status: HTTPCode.OK,
		};
	}
}

export { FriendController };
