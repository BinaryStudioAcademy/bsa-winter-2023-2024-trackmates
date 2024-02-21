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
			path: `${UsersApiPath.PROFILE}/:id`,
			validation: {
				body: userProfileValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /users/profile/{id}:
	 *    patch:
	 *      description: Updates a user's details
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the user to update
	 *          required: true
	 *          schema:
	 *            type: string
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
