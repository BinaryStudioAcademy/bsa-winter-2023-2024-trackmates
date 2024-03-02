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
 *         userAvatarUrl:
 *           type: string
 *         userFirstName:
 *           type: string
 *         userId:
 *           type: number
 *         userLastName:
 *           type: string
 *         status:
 *           type: string
 *           enum: [read, unread]
 *         updatedAt:
 *           type: string
 *         receiverUserId:
 *           type: number
 *         type:
 *           type: string
 *           enum: [new_follower]
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

		this.addRoute({
			handler: (options) => {
				return this.hasUserUnreadNotifications(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.UNREAD,
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

	/**
	 * @swagger
	 * /user-notifications/unread:
	 *    get:
	 *      tags:
	 *        - User notifications
	 *      security:
	 *        - bearerAuth: []
	 *      description: Checks if user has unread notifications
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: boolean
	 */
	public async hasUserUnreadNotifications(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.hasUserUnreadNotifications(
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}
}

export { UserNotificationController };
