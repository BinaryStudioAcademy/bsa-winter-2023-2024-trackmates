import { APIPath } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";

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
				this.searchFriendsByValue(
					options as APIHandlerOptions<{
						body: {
							limit?: number;
							offset?: number;
							text: string;
						};
					}>,
				),
			method: "POST",
			path: UsersApiPath.SEARCH,
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
	 * /user/search:
	 *    post:
	 *      description: Search user by input value
	 *      requestBody:
	 *        description: Input text and setting
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                text:
	 *                  type: string
	 *                offset:
	 *                  type: number
	 * 				  limit:
	 * 					type: number
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: array
	 *                    $ref: "#/components/schemas/User"
	 */
	private async searchFriendsByValue(
		options: APIHandlerOptions<{
			body: {
				limit?: number;
				offset?: number;
				text: string;
			};
		}>,
	): Promise<APIHandlerResponse> {
		const one = 1; // for commint only
		const zero = 0; // for commint only
		const { limit = one, offset = zero, text } = options.body;

		const friends = await this.userService.searchFriendsByValue(
			limit,
			offset,
			text,
		);

		return {
			payload: friends,
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
