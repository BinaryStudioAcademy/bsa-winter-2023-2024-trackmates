import Stripe from "stripe";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { getShiftedDate } from "~/libs/helpers/helpers.js";
import { config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	CronExpression,
	type TaskScheduler,
} from "~/libs/modules/task-scheduler/task-scheduler.js";
import { type Service } from "~/libs/types/types.js";
import { userService } from "~/modules/users/users.js";

import { SMALLEST_CURRENCY_UNIT_MULTIPLIER } from "./libs/constants/constants.js";
import {
	Currency,
	PaymentIntentStatus,
	PaymentMethodType,
	SubscriptionPlan,
} from "./libs/enums/enums.js";
import { SubscriptionError } from "./libs/exceptions/exceptions.js";
import {
	type SubscriptionPaymentIntentCreateRequestDto,
	type SubscriptionPaymentIntentCreateResponseDto,
	type SubscriptionResponseDto,
} from "./libs/types/types.js";
import { SubscriptionEntity } from "./subscription.entity.js";
import { type SubscriptionRepository } from "./subscription.repository.js";

type Constructor = {
	subscriptionRepository: SubscriptionRepository;
	taskScheduler: TaskScheduler;
};

class SubscriptionService implements Service {
	private stripe: Stripe;

	private subscriptionRepository: SubscriptionRepository;

	private taskScheduler: TaskScheduler;

	public constructor({ subscriptionRepository, taskScheduler }: Constructor) {
		this.stripe = new Stripe(config.ENV.STRIPE.SECRET_KEY);
		this.subscriptionRepository = subscriptionRepository;
		this.taskScheduler = taskScheduler;
	}

	private async deleteExpiredSubscriptions(): Promise<void> {
		await this.subscriptionRepository.deleteExpiredSubscriptions();
	}

	private getPriceInSmallestCurrencyUnit(amount: number): number {
		return amount * SMALLEST_CURRENCY_UNIT_MULTIPLIER;
	}

	public async cancelPaymentIntent(id: string): Promise<boolean> {
		const { status } = await this.stripe.paymentIntents.cancel(id);

		return status === PaymentIntentStatus.CANCELED;
	}

	public async create(expiresAt: string): Promise<SubscriptionResponseDto> {
		const subscription = await this.subscriptionRepository.create(
			SubscriptionEntity.initializeNew({
				expiresAt,
			}),
		);

		return subscription.toObject();
	}

	public async createPaymentIntent({
		price,
	}: SubscriptionPaymentIntentCreateRequestDto): Promise<SubscriptionPaymentIntentCreateResponseDto> {
		const { client_secret: clientSecret, id } =
			await this.stripe.paymentIntents.create({
				amount: this.getPriceInSmallestCurrencyUnit(price),
				currency: Currency.USD,
				payment_method_types: [PaymentMethodType.CARD],
			});

		return { clientSecret: clientSecret as string, id };
	}

	public async delete(id: number): Promise<boolean> {
		return await this.subscriptionRepository.delete(id);
	}

	public async find(id: number): Promise<SubscriptionResponseDto> {
		const subscription = await this.subscriptionRepository.find(id);

		if (!subscription) {
			throw new SubscriptionError({
				message: ExceptionMessage.SUBSCRIPTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return subscription.toObject();
	}

	public async findAll(): Promise<{ items: SubscriptionResponseDto[] }> {
		const { items } = await this.subscriptionRepository.findAll();

		return {
			items: items.map((subscription) => subscription.toObject()),
		};
	}

	public initCrone(): void {
		this.taskScheduler.schedule(CronExpression.EVERY_MIDNIGHT, () => {
			void this.deleteExpiredSubscriptions();
		});
	}

	public async subscribe({
		userId,
	}: {
		userId: number;
	}): Promise<SubscriptionResponseDto> {
		const subscriptionEntity = await this.subscriptionRepository.create(
			SubscriptionEntity.initializeNew({
				expiresAt: getShiftedDate(new Date().toISOString(), {
					month: SubscriptionPlan.MONTH_DURATION,
				}),
			}),
		);

		const subscription = subscriptionEntity.toObject();

		await userService.addSubscription(userId, subscription.id);

		return subscription;
	}

	public async update(
		id: number,
		payload: { expiresAt: string },
	): Promise<SubscriptionResponseDto> {
		const subscription = await this.subscriptionRepository.find(id);

		if (!subscription) {
			throw new SubscriptionError({
				message: ExceptionMessage.SUBSCRIPTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { expiresAt } = payload;

		const updatedSubscription = await this.subscriptionRepository.update(
			id,
			SubscriptionEntity.initializeNew({
				expiresAt,
			}),
		);

		return updatedSubscription.toObject();
	}
}

export { SubscriptionService };
