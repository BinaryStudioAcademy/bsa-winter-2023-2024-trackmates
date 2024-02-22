import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { type FriendService } from "./friend.service.js";
import { FriendRequestValidationSchema } from "./friends.js";
import { FriendsApiPath } from "./libs/enums/enums.js";
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
 *           type: string;
 *         email:
 *           type string;
 *         firstName:
 *           type string;
 *         id:
 *           type number;
 *         lastName:
 *           type string;
 *         updatedAt:
 *           type string;
 *     Error:
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
			path: FriendsApiPath.FOLLOW,
			validation: {
				body: FriendRequestValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.unfollow(
					options as APIHandlerOptions<{
						body: FriendFollowingRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "DELETE",
			path: FriendsApiPath.UNFOLLOW,
			validation: {
				body: FriendRequestValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIHandlerOptions<{
						body: FriendFollowingRequestDto;
					}>,
				),
			method: "PATCH",
			path: FriendsApiPath.UPDATE,
			validation: {
				body: FriendRequestValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.find(
					options as APIHandlerOptions<{
						params: FriendFollowingRequestDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.ID,
			validation: {
				params: FriendRequestValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) =>
				this.getUserFollowers(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.FOLLOWERS,
		});
		this.addRoute({
			handler: (options) =>
				this.getUserFollowings(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.FOLLOWINGS,
		});
		this.addRoute({
			handler: (options) =>
				this.getPotentialFollowers(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: FriendsApiPath.POTENTIAL_FOLLOWINGS,
		});
	}

	/**
	 * @swagger
	 * /friend/follow:
	 *    post:
	 *      description: Create follow relation and return user whicn user follow
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
	 * /friend/:id:
	 *    get:
	 *      description: Returns found user
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 * 	          400:
	 *          description: Bad request
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/Error"
	 */
	private async find(
		options: APIHandlerOptions<{
			params: {
				id: number;
			};
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.find(options.params.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/:
	 *    get:
	 *      description: Returns array of all users
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 * 	          400:
	 *          description: Bad request
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/Error"
	 */
	private async findAll(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.findAll(options.user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/potential-following:
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
	 * /friend/unfollow:
	 *    post:
	 *      description: detele follow relation
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
	private async unfollow(
		options: APIHandlerOptions<{
			body: FriendFollowingRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.unfollow(
				options.body.id,
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friend/update:
	 *    patch:
	 *      description: Update a user record
	 *      requestBody:
	 *        description: Request body for updating a user
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: "#/components/schemas/FriendFollowingRequestDto"
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/User"
	 *        400:
	 *          description: Bad request
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: "#/components/schemas/Error"
	 */
	private async update(
		options: APIHandlerOptions<{
			body: FriendFollowingRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.update(options.body.id),
			status: HTTPCode.OK,
		};
	}
}

export { FriendController };
