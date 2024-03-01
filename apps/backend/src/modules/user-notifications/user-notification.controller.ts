import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type NotificationService } from "~/modules/notifications/notifications.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { UserNotificationsApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *         id:
 *           type: number
 *         message:
 *           type: string
 *         sourceUserAvatarUrl:
 *           type: string
 *         sourceUserFirstName:
 *           type: string
 *         sourceUserId:
 *           type: number
 *         sourceUserLastName:
 *           type: string
 *         status:
 *           type: string
 *           enum: [read, unread]
 *         updatedAt:
 *           type: string
 *         userId:
 *           type: number
 */
class UserNotificationController extends BaseController {
	private notificationService: NotificationService;

	public constructor(logger: Logger, notificationService: NotificationService) {
		super(logger, APIPath.USER_NOTIFICATIONS);

		this.notificationService = notificationService;

		this.addRoute({
			handler: (options) => {
				return this.getNotificationsByUserId(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /user-notifications:
	 *    get:
	 *      tags:
	 *        - User notifications
	 *      security:
	 *        - bearerAuth: []
	 *      description: Returns all user notifications
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
	 *                      $ref: "#/components/schemas/Notification"
	 */
	public async getNotificationsByUserId(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.findAllByUserId(options.user.id),
			status: HTTPCode.OK,
		};
	}
}

export { UserNotificationController };
