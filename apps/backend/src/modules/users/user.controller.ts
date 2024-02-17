import { APIPath } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";
import {
	UserProfileRequestDto,
	userProfileValidationSchema,
} from "~/modules/users/users.js";

import { UsersApiPath } from "./libs/enums/enums.js";

/*** @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 */
class UserController extends BaseController {
	private userService: UserService;

	public constructor(logger: Logger, userService: UserService) {
		super(logger, APIPath.USERS);

		this.userService = userService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: UsersApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.updateUser(
					options as APIHandlerOptions<{
						body: UserProfileRequestDto;
						params: {
							id: number;
						};
					}>,
				),
			method: "PUT",
			path: `${UsersApiPath.PROFILE}/:id`,
			validation: {
				body: userProfileValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: Returns an array of users
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
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(),
			status: HTTPCode.OK,
		};
	}
	/**
	 * @swagger
	 * /profile/{id}:
	 *    put:
	 *      description: Updates a user's details
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the user to update
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            minimum: 1
	 *        - in: body
	 *          name: user
	 *          description: Updated user object
	 *          required: true
	 *          schema:
	 *            $ref: '#/components/schemas/ProfileUpdate'
	 *      responses:
	 *        '200':
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Profile'
	 *        '404':
	 *          description: User not found
	 *        '500':
	 *          description: Internal server error
	 */
	private async updateUser(
		options: APIHandlerOptions<{
			body: UserProfileRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.update(options.body),
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
