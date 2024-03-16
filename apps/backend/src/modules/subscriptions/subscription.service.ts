import { ExceptionMessage } from "~/libs/enums/enums.js";
import { getShiftedDate } from "~/libs/helpers/helpers.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type StripeService } from "~/libs/modules/stripe/stripe.js";
import { type Service } from "~/libs/types/types.js";
import { userService } from "~/modules/users/users.js";

import { SubscriptionPlan } from "./libs/enums/enums.js";
import { SubscriptionError } from "./libs/exceptions/exceptions.js";
import { type SubscriptionResponseDto } from "./libs/types/types.js";
import { SubscriptionEntity } from "./subscription.entity.js";
import { type SubscriptionRepository } from "./subscription.repository.js";

type Constructor = {
	stripe: StripeService;
	subscriptionRepository: SubscriptionRepository;
};

class SubscriptionService implements Service {
	private stripe: StripeService;

	private subscriptionRepository: SubscriptionRepository;

	public constructor({ stripe, subscriptionRepository }: Constructor) {
		this.stripe = stripe;
		this.subscriptionRepository = subscriptionRepository;
	}

	public async cancelPaymentIntent(id: string): Promise<boolean> {
		return await this.stripe.cancelPaymentIntent(id);
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
	}: {
		price: number;
	}): Promise<{ clientSecret: string; id: string }> {
		const { clientSecret, id } = await this.stripe.createPaymentIntent({
			price,
		});

		return { clientSecret, id };
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
		const subscriptions = await this.subscriptionRepository.findAll();

		return {
			items: subscriptions.map((subscription) => subscription.toObject()),
		};
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
