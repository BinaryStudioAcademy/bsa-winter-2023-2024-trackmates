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
import {
	type NotificationTypeFilterRequestDto,
	type ReadNotificationsRequestDto,
} from "./libs/types/types.js";
import {
	notificationTypeQueryParameterValidationSchema,
	readNotificationsRequestValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
						query: NotificationTypeFilterRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.ROOT,
			validation: {
				query: notificationTypeQueryParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.checkHasUserUnreadNotifications(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.CHECK_HAS_USER_UNREAD_NOTIFICATIONS,
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
	 * /user-notifications/check-has-user-unread-notifications:
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
	public async checkHasUserUnreadNotifications(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.checkHasUserUnreadNotifications(
				options.user.id,
			),
			status: HTTPCode.OK,
		};
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
	 *      parameters:
	 *        - name: type
	 *          in: query
	 *          description: The type of notification
	 *          schema:
	 *            type: string
	 *            enum: [all, comments, followers, likes]
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
			query: NotificationTypeFilterRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.findAllByReceiverUserId(
				options.user.id,
				options.query.type,
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
