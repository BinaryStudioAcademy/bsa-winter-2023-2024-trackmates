import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type PushSubscription } from "../push-subscriptions/push-subscriptions.js";
import { PushNotificationsApiPath } from "./libs/enums/enums.js";
import { type PushNotificationRequestDto } from "./libs/types/types.js";
import { createSubscriptionValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type PushNotificationService } from "./push-notification.service.js";

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
	private pushNotificationService: PushNotificationService;

	public constructor(
		logger: Logger,
		pushNotificationService: PushNotificationService,
	) {
		super(logger, APIPath.PUSH_NOTIFICATIONS);
		this.pushNotificationService = pushNotificationService;

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
	private async sendNotification({
		body,
	}: APIHandlerOptions<{
		body: PushNotificationRequestDto;
	}>): Promise<APIHandlerResponse> {
		await this.pushNotificationService.sendNotificationsToSubscribers(body);

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
	private async subscribe({
		body,
	}: APIHandlerOptions<{
		body: PushSubscription;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.pushNotificationService.createSubscription(body),
			status: HTTPCode.CREATED,
		};
	}
}

export { PushNotificationController };
