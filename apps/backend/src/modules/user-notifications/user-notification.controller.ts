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

import {
	NotificationFilter,
	UserNotificationsApiPath,
} from "./libs/enums/enums.js";
import {
	type NotificationFilterRequestDto,
	type ReadNotificationsRequestDto,
} from "./libs/types/types.js";
import {
	readNotificationsRequestValidationSchema,
	userNotificationQueryParametersValidationSchema,
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
						query: NotificationFilterRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.ROOT,
			validation: {
				query: userNotificationQueryParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.getUnreadNotificationsCount(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserNotificationsApiPath.UNREAD_COUNT,
		});

		this.addRoute({
			handler: (options) => {
				return this.setReadNotifications(
					options as APIHandlerOptions<{
						body: ReadNotificationsRequestDto;
						user: UserAuthResponseDto;
					}>,
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
	 *        - name: type
	 *          in: query
	 *          description: The type of notification
	 *          schema:
	 *            type: string
	 *            enum: [all, comments, followers, likes]
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
			query: NotificationFilterRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.findAllByReceiverUserId(
				options.user.id,
				options.query.type ?? NotificationFilter.ALL,
				options.query.search ?? "",
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /user-notifications/unread-count:
	 *    get:
	 *      tags:
	 *        - User notifications
	 *      security:
	 *        - bearerAuth: []
	 *      description: Get a count of all user's unread notifications
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: number
	 */
	public async getUnreadNotificationsCount(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.getUnreadNotificationsCount(
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
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.setReadNotifications(
				options.body.notificationIds,
				options.user.id,
			),
			status: HTTPCode.OK,
		};
	}
}

export { UserNotificationController };
