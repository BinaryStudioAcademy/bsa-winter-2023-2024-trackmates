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
import { type ReadNotificationsRequestDto } from "./libs/types/types.js";
import { readNotificationsRequestValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

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
 *           minimum: 1
 *         message:
 *           type: string
 *         userAvatarUrl:
 *           type: string
 *         userFirstName:
 *           type: string
 *         userId:
 *           type: number
 *           minimum: 1
 *         userLastName:
 *           type: string
 *         status:
 *           type: string
 *           enum: [read, unread]
 *         updatedAt:
 *           type: string
 *         receiverUserId:
 *           type: number
 *           minimum: 1
 *         type:
 *           type: string
 *           enum: [new-follower]
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
						query: { search: string };
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.getUnreadNotificationCounter(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.GET_UNREAD_NOTIFICATION_COUNTER,
		});

		this.addRoute({
			handler: (options) => {
				return this.setReadNotifications(
					options as APIHandlerOptions<{ body: ReadNotificationsRequestDto }>,
				);
			},
			method: "PATCH",
			path: UserNotificationsApiPath.READ_NOTIFICATIONS,
			validation: {
				body: readNotificationsRequestValidationSchema,
			},
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
	 *      parameters:
	 *        - name: search
	 *          in: query
	 *          type: string
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
			query: { search?: string };
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.findAllByReceiverUserId(
				options.user.id,
				options.query.search ?? "",
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /user-notifications/get-unread-notification-counter:
	 *    get:
	 *      tags:
	 *        - User notifications
	 *      security:
	 *        - bearerAuth: []
	 *      description: Get a count of unread notifications
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: number
	 */
	public async getUnreadNotificationCounter(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.getUnreadNotificationCounter(
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /user-notifications/read-notifications:
	 *    patch:
	 *      tags:
	 *        - User notifications
	 *      description: Read user notifications
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                notificationIds:
	 *                  type: array
	 *                  items:
	 *                    type: number
	 *                    minimum: 1
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
	public async setReadNotifications(
		options: APIHandlerOptions<{
			body: ReadNotificationsRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.setReadNotifications(
				options.body.notificationIds,
			),
			status: HTTPCode.OK,
		};
	}
}

export { UserNotificationController };
