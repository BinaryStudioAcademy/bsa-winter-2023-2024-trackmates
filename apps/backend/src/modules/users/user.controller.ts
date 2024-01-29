import { APIPath } from "~/libs/enums/enums.js";
import {
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
      path: UsersApiPath.ROOT,
      method: "GET",
      handler: () => this.findAll(),
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
      status: HTTPCode.OK,
      payload: await this.userService.findAll(),
    };
  }
}

export { UserController };
