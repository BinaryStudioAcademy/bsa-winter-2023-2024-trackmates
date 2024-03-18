import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationRequestDto } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { type FriendService } from "./friend.service.js";
import {
	addFriendValidationSchema,
	friendIdParameterValidationSchema,
} from "./friends.js";
import { FriendsApiPath } from "./libs/enums/enums.js";
import { type FriendFollowRequestDto } from "./libs/types/types.js";
import { friendGetAllQueryValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         id:
 *           type: number
 *         lastName:
 *           type: string
 *         updatedAt:
 *           type: string
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
			handler: (options) => {
				return this.createSubscription(
					options as APIHandlerOptions<{
						body: FriendFollowRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: FriendsApiPath.FOLLOW,
			validation: {
				body: addFriendValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.deleteSubscription(
					options as APIHandlerOptions<{
						body: FriendFollowRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "DELETE",
			path: FriendsApiPath.UNFOLLOW,
			validation: {
				body: addFriendValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: FriendFollowRequestDto;
					}>,
				);
			},
			method: "DELETE",
			path: FriendsApiPath.UNFOLLOW_BY_$ID,
			validation: {
				params: friendIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: FriendFollowRequestDto;
					}>,
				);
			},
			method: "PATCH",
			path: FriendsApiPath.UPDATE,
			validation: {
				body: addFriendValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.find(
					options as APIHandlerOptions<{
						params: FriendFollowRequestDto;
					}>,
				);
			},
			method: "GET",
			path: FriendsApiPath.$ID,
			validation: {
				params: friendIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: () => {
				return this.findAll();
			},
			method: "GET",
			path: FriendsApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) => {
				return this.getUserFollowers(
					options as APIHandlerOptions<{
						query: { search: string } & PaginationRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: FriendsApiPath.FOLLOWERS,
			validation: {
				query: friendGetAllQueryValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.getUserFollowings(
					options as APIHandlerOptions<{
						query: { search: string } & PaginationRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: FriendsApiPath.FOLLOWINGS,
			validation: {
				query: friendGetAllQueryValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.getAllUserFollowingsIds(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: FriendsApiPath.FOLLOWINGS_IDS,
		});
		this.addRoute({
			handler: (options) => {
				return this.getPotentialFollowers(
					options as APIHandlerOptions<{
						query: { search: string } & PaginationRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: FriendsApiPath.POTENTIAL_FOLLOWINGS,
			validation: {
				query: friendGetAllQueryValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.getIsFollowing(
					options as APIHandlerOptions<{
						params: FriendFollowRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: FriendsApiPath.$ID_IS_FOLLOWING,
		});
	}

	/**
	 * @swagger
	 * /friends/follow:
	 *   post:
	 *     tags:
	 *       - Friends
	 *     description: Create follow relation and return user which we started to follow
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       description: User auth data
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               id:
	 *                 type: string
	 *     responses:
	 *       201:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: object
	 *                   $ref: "#/components/schemas/User"
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 *               oneOf:
	 *                 - $ref: '#/components/schemas/Error'
	 *                 - type: null
	 */

	private async createSubscription(
		options: APIHandlerOptions<{
			body: FriendFollowRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.createSubscription(
				options.user.id,
				options.body.id,
			),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /friends/unfollow/{id}:
	 *   delete:
	 *     tags:
	 *       - Friends
	 *     description: Unfollow by relation ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         description: ID of the user to unfollow
	 *         required: true
	 *         schema:
	 *           type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   description: Indicates whether the unfollow operation was successful (true) or not (false).
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Error'
	 */

	private async delete(
		options: APIHandlerOptions<{
			params: FriendFollowRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.delete(options.params.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/unfollow:
	 *   delete:
	 *     tags:
	 *       - Friends
	 *     description: Delete follow relation by following usre ID
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       description: User auth data
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               id:
	 *                 type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   description: Indicates whether the unsubscribe operation was successful (true) or not (false).
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Error'
	 */
	private async deleteSubscription(
		options: APIHandlerOptions<{
			body: FriendFollowRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.deleteSubscription(
				options.user.id,
				options.body.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/{id}:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns found user
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         description: ID of the user
	 *         required: true
	 *         schema:
	 *           type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/User"
	 *       400:
	 *         description: Bad request
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/Error"
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
	 * /friends/:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns array of all users which users following
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/User"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/followings/ids:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns an array of ids that belong to friends that user follows
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: integer
	 */
	private async getAllUserFollowingsIds(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.getUserFollowingsIds(options.user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/{id}/is-following:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns a boolean indicating whether current user follows another user
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         description: ID of the user
	 *         required: true
	 *         schema:
	 *           type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 */
	private async getIsFollowing(
		options: APIHandlerOptions<{
			params: FriendFollowRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.getIsFollowing(
				options.user.id,
				options.params.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/potential-followings:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns an array of User that the user does not follow
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: search
	 * 		   in: query
	 *         schema:
	 *           type: string
	 *       - name: count
	 *         in: query
	 *         schema:
	 *           type: integer
	 *       - name: page
	 *         in: query
	 *         schema:
	 *           type: integer
	 *           minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/User"
	 */
	private async getPotentialFollowers({
		query: { count, page, search },
		user: { id },
	}: APIHandlerOptions<{
		query: { search: string | undefined } & PaginationRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const parameters = { count, id, page, search: search ?? "" };

		return {
			payload: await this.friendService.getPotentialFollowers(parameters),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/followers:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns an array of User that the user is followed by
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 * 		- name: search
	 * 		   in: query
	 *         schema:
	 *           type: string
	 *       - name: count
	 *         in: query
	 *         schema:
	 *           type: integer
	 *       - name: page
	 *         in: query
	 *         schema:
	 *           type: integer
	 *           minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/User"
	 */
	private async getUserFollowers({
		query: { count, page, search },
		user: { id },
	}: APIHandlerOptions<{
		query: { search: string | undefined } & PaginationRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const parameters = { count, id, page, search: search ?? "" };

		return {
			payload: await this.friendService.getUserFollowers(parameters),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/followings:
	 *   get:
	 *     tags:
	 *       - Friends
	 *     description: Returns an array of User that the user is following
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: search
	 * 		   in: query
	 *         schema:
	 *           type: string
	 *       - name: count
	 *         in: query
	 *         schema:
	 *           type: integer
	 *       - name: page
	 *         in: query
	 *         schema:
	 *           type: integer
	 *           minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: "#/components/schemas/User"
	 */
	private async getUserFollowings({
		query: { count, page, search },
		user: { id },
	}: APIHandlerOptions<{
		query: { search: string | undefined } & PaginationRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const parameters = { count, id, page, search: search ?? "" };

		return {
			payload: await this.friendService.getUserFollowings(parameters),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /friends/update:
	 *   patch:
	 *     tags:
	 *       - Friends
	 *     description: Update a user record
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       description: Request body for updating a user
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: "#/components/schemas/FriendFollowRequestDto"
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/User"
	 */
	private async update(
		options: APIHandlerOptions<{
			body: FriendFollowRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.friendService.update(options.body.id),
			status: HTTPCode.OK,
		};
	}
}

export { FriendController };
