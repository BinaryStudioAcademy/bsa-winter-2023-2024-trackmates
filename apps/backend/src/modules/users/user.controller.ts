import { APIPath, PermissionKey, PermissionMode } from "~/libs/enums/enums.js";
import {
	checkByParameterIfNotTheSameUser,
	checkUserPermissions,
} from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";
import {
	type UserProfileRequestDto,
	userProfileValidationSchema,
} from "~/modules/users/users.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { type UserGetByIdRequestDto } from "./libs/types/types.js";
import { userIdParametersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class UserController extends BaseController {
	private userService: UserService;

	public constructor(logger: Logger, userService: UserService) {
		super(logger, APIPath.USERS);

		this.userService = userService;

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: { id: string };
					}>,
				);
			},
			method: "DELETE",
			path: UsersApiPath.$ID,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_USERS],
					PermissionMode.ALL_OF,
				),
				checkByParameterIfNotTheSameUser<{ id: string }>("id"),
			],
			validation: {
				params: userIdParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.updateUser(
					options as APIHandlerOptions<{
						body: UserProfileRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: UsersApiPath.$ID,
			validation: {
				body: userProfileValidationSchema,
			},
		});

		this.addRoute({
			handler: () => {
				return this.findAll();
			},
			method: "GET",
			path: UsersApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.findById(
					options as APIHandlerOptions<{
						params: UserGetByIdRequestDto;
					}>,
				);
			},
			method: "GET",
			path: UsersApiPath.$ID,
			validation: {
				params: userIdParametersValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /users:
	 *    delete:
	 *      tags:
	 *        - Users
	 *      security:
	 *        - bearerAuth: []
	 *      description: Delete user
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: boolean
	 */
	private async delete({
		params: { id },
	}: APIHandlerOptions<{
		params: {
			id: string;
		};
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.delete(Number(id)),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      tags:
	 *        - Users
	 *      security:
	 *        - bearerAuth: []
	 *      description: Find all users
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
	 *                      $ref: "#/components/schemas/User"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *   get:
	 *     tags:
	 *       - Users
	 *     security:
	 *       - bearerAuth: []
	 *     description: Returns found user
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
	 *               $ref: '#/components/schemas/User'
	 */
	private async findById(
		options: APIHandlerOptions<{
			params: {
				id: number;
			};
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findById(options.params.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *    patch:
	 *      tags:
	 *        - Users
	 *      security:
	 *        - bearerAuth: []
	 *      description: Updates a user's details
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the user to update
	 *          required: true
	 *          schema:
	 *            type: string
	 *      requestBody:
	 *        description: Updated user object
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                firstName:
	 *                  type: string
	 *                lastName:
	 *                  type: string
	 *                nickname:
	 *                  type: string
	 *                sex:
	 *                  type: string
	 *                  enum: [male, female, prefer-not-to-say]
	 *      responses:
	 *        '200':
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/User'
	 */

	private async updateUser(
		options: APIHandlerOptions<{
			body: UserProfileRequestDto;
			params: {
				id: string;
			};
		}>,
	): Promise<APIHandlerResponse> {
		const userId = Number(options.params.id);

		return {
			payload: await this.userService.update(userId, options.body),
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
