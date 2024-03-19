import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { SubscriptionApiPath } from "./libs/enums/enums.js";
import {
	type SubscriptionPaymentIntentCancelRequestDto,
	type SubscriptionPaymentIntentCreateRequestDto,
} from "./libs/types/types.js";
import {
	cancelPaymentIntentValidationSchema,
	createPaymentIntentValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type SubscriptionService } from "./subscription.service.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      Subscription:
 *        type: object
 *        properties:
 *          expiresAt:
 *            type: string
 *          id:
 *            type: number
 *            minimum: 1
 */
class SubscriptionController extends BaseController {
	private subscriptionService: SubscriptionService;

	public constructor(logger: Logger, subscriptionService: SubscriptionService) {
		super(logger, APIPath.SUBSCRIPTIONS);

		this.subscriptionService = subscriptionService;

		this.addRoute({
			handler: (options) => {
				return this.subscribe(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: SubscriptionApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.createPaymentIntent(
					options as APIHandlerOptions<{
						body: SubscriptionPaymentIntentCreateRequestDto;
					}>,
				);
			},
			method: "POST",
			path: SubscriptionApiPath.PAYMENT_INTENT,
			validation: {
				body: createPaymentIntentValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.cancelPaymentIntent(
					options as APIHandlerOptions<{
						body: SubscriptionPaymentIntentCancelRequestDto;
					}>,
				);
			},
			method: "DELETE",
			path: SubscriptionApiPath.PAYMENT_INTENT,
			validation: {
				body: cancelPaymentIntentValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /subscriptions/payment-intent:
	 *   delete:
	 *     tags:
	 *      - Subscription
	 *     description: Cancel payment intent
	 *     security:
	 *      - bearerAuth: []
	 *     requestBody:
	 *       description: Cancel payment intent data
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               id:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 */
	private async cancelPaymentIntent(
		options: APIHandlerOptions<{
			body: SubscriptionPaymentIntentCancelRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.subscriptionService.cancelPaymentIntent(
				options.body.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /subscriptions/payment-intent:
	 *   post:
	 *     tags:
	 *      - Subscription
	 *     description: Create a new payment intent
	 *     security:
	 *      - bearerAuth: []
	 *     requestBody:
	 *       description: Create payment intent data
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               price:
	 *                 type: number
	 *                 minimum: 1
	 *     responses:
	 *       201:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: string
	 *                 clientSecret:
	 *                   type: string
	 */
	private async createPaymentIntent(
		options: APIHandlerOptions<{
			body: SubscriptionPaymentIntentCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.subscriptionService.createPaymentIntent({
				price: options.body.price,
			}),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /subscriptions:
	 *   post:
	 *     tags:
	 *      - Subscription
	 *     description: Create a new subscription
	 *     security:
	 *      - bearerAuth: []
	 *     responses:
	 *       201:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Subscription'
	 */
	private async subscribe(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.subscriptionService.subscribe({
				userId: options.user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}
}

export { SubscriptionController };
