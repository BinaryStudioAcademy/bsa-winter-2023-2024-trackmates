import { APIPath } from "~/libs/enums/enums.js";
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
			handler: (options) =>
				this.updateUser(
					options as APIHandlerOptions<{
						body: UserProfileRequestDto;
						params: Record<"id", string>;
					}>,
				),
			method: "PATCH",
			path: `${UsersApiPath.ROOT}:id`,
			validation: {
				body: userProfileValidationSchema,
			},
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
	 * /users/{id}:
	 *   get:
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
			params: { id: string };
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
