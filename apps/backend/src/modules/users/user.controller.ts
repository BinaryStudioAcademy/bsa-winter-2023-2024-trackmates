import { APIPath } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";

import { PaginationDefaultValue, UsersApiPath } from "./libs/enums/enums.js";

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
				this.searchFriendsByName(
					options as APIHandlerOptions<{
						body: {
							limit?: number;
							page?: number;
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
	 * /search:
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
	private async searchFriendsByName(
		options: APIHandlerOptions<{
			body: {
				limit?: number;
				page?: number;
				text: string;
			};
		}>,
	): Promise<APIHandlerResponse> {
		const {
			limit = PaginationDefaultValue.DEFAULT_LIMIT,
			page = PaginationDefaultValue.DEFAULT_OFFSET,
			text,
		} = options.body;

		const friends = await this.userService.searchFriendsByName(
			limit,
			page,
			text,
		);

		return {
			payload: friends,
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
