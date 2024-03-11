import { WebPushError } from "web-push";

import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { pushNotification } from "~/libs/modules/push-notification/push-notification.js";

import {
	type PushSubscription,
	type PushSubscriptionService,
} from "../push-subscriptions/push-subscriptions.js";
import { PushNotificationsApiPath } from "./libs/enums/enums.js";
import {
	transformDtoToSubscription,
	transformSubscriptionToDto,
} from "./libs/helpers/helpers.js";
import { type PushNotificationRequestDto } from "./libs/types/types.js";
import { createSubscriptionValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     PushSubscription:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         authKey:
 *           type: string
 *         p256dhKey:
 *           type: string
 *         endpoint:
 *           type: string
 *         expirationTime:
 *           type: string
 *           nullable: true
 */
class PushNotificationController extends BaseController {
	private pushSubscriptionService: PushSubscriptionService;

	public constructor(
		logger: Logger,
		pushSubscriptionService: PushSubscriptionService,
	) {
		super(logger, APIPath.PUSH_NOTIFICATIONS);
		this.pushSubscriptionService = pushSubscriptionService;

		this.addRoute({
			handler: (options) => {
				return this.subscribe(
					options as APIHandlerOptions<{
						body: PushSubscription;
					}>,
				);
			},
			method: "POST",
			path: PushNotificationsApiPath.SUBSCRIBE,
			validation: {
				body: createSubscriptionValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.sendNotification(
					options as APIHandlerOptions<{
						body: PushNotificationRequestDto;
					}>,
				);
			},
			method: "POST",
			path: PushNotificationsApiPath.SEND_NOTIFICATION,
		});
	}

	/**
	 * @swagger
	 * /push-notifications/send-notification:
	 *   post:
	 *     tags:
	 *       - Push Notifications
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               message:
	 *                 type: string
	 *               options:
	 *                 type: object
	 *                 properties:
	 *                   title:
	 *                     type: string
	 *                   icon:
	 *                     type: string
	 *                     format: uri
	 *     description: Send push notifications to all subscribed users
	 *     responses:
	 *       200:
	 *         description: Push notifications sent successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 payload:
	 *                   type: boolean
	 *                   description: Indicates if the notification was sent successfully
	 */
	private async sendNotification(
		options: APIHandlerOptions<{
			body: PushNotificationRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { body } = options;

		const { items: subscriptions } =
			await this.pushSubscriptionService.findAll();

		await Promise.all(
			subscriptions.map(async (subscription) => {
				try {
					await pushNotification.sendNotification(
						transformDtoToSubscription(subscription),
						JSON.stringify(body),
					);
				} catch (error) {
					if (
						error instanceof WebPushError &&
						error.statusCode === HTTPCode.GONE
					) {
						await this.pushSubscriptionService.delete(subscription.id);
					}
				}
			}),
		);

		return {
			payload: true,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /push-notifications/subscribe:
	 *    post:
	 *      tags:
	 *        - Push Notifications
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                endpoint:
	 *                  type: string
	 *                expirationTime:
	 *                  type: integer
	 *                  format: int64
	 *                  nullable: true
	 *                keys:
	 *                  type: object
	 *                  properties:
	 *                    auth:
	 *                      type: string
	 *                    p256dh:
	 *                      type: string
	 *      description: Create subscription for push notifications
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/PushSubscription"
	 */
	private async subscribe(
		options: APIHandlerOptions<{
			body: PushSubscription;
		}>,
	): Promise<APIHandlerResponse> {
		const { body } = options;

		return {
			payload: await this.pushSubscriptionService.create({
				...transformSubscriptionToDto(body),
			}),
			status: HTTPCode.CREATED,
		};
	}
}

export { PushNotificationController };
