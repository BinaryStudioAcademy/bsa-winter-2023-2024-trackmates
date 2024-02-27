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

class UserNotificationController extends BaseController {
	private notificationService: NotificationService;

	public constructor(logger: Logger, notificationService: NotificationService) {
		super(logger, APIPath.USER_NOTIFICATIONS);

		this.notificationService = notificationService;

		this.addRoute({
			handler: (options) =>
				this.getNotificationsByUserId(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: UserNotificationsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.deleteUserNotification(
					options as APIHandlerOptions<{
						params: {
							notificationId: string;
						};
						user: UserAuthResponseDto;
					}>,
				),
			method: "DELETE",
			path: UserNotificationsApiPath.$ID,
		});
	}

	public async deleteUserNotification({
		params,
		user,
	}: APIHandlerOptions<{
		params: { notificationId: string };
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.deleteUserNotification(
				user.id,
				Number(params.notificationId),
			),
			status: HTTPCode.OK,
		};
	}

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
