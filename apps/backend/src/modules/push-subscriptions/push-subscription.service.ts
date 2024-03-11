import { HTTPCode } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";

import { PushSubscriptionErrorMessage } from "./libs/enums/enums.js";
import { PushSubscriptionError } from "./libs/exceptions/exceptions.js";
import {
	type PushSubscriptionRequestDto,
	type PushSubscriptionResponseDto,
} from "./libs/types/types.js";
import { PushSubscriptionEntity } from "./push-subscription.entity.js";
import { type PushSubscriptionRepository } from "./push-subscription.repository.js";

class PushSubscriptionService implements Service {
	private pushSubscriptionRepository: PushSubscriptionRepository;

	public constructor(pushSubscriptionRepository: PushSubscriptionRepository) {
		this.pushSubscriptionRepository = pushSubscriptionRepository;
	}

	public async create(
		pushSubscription: PushSubscriptionRequestDto,
	): Promise<PushSubscriptionResponseDto> {
		const { authKey, endpoint, expirationTime, p256dhKey } = pushSubscription;

		const createdPushSubscription =
			await this.pushSubscriptionRepository.create(
				PushSubscriptionEntity.initializeNew({
					authKey,
					endpoint,
					expirationTime,
					p256dhKey,
				}),
			);

		return createdPushSubscription.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const pushSubscriptionById = await this.pushSubscriptionRepository.find(id);

		if (!pushSubscriptionById) {
			throw new PushSubscriptionError({
				message: PushSubscriptionErrorMessage.PUSH_SUBSCRIPTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.pushSubscriptionRepository.delete(id);
	}

	public async find(id: number): Promise<PushSubscriptionResponseDto> {
		const pushSubscriptionById = await this.pushSubscriptionRepository.find(id);

		if (!pushSubscriptionById) {
			throw new PushSubscriptionError({
				message: PushSubscriptionErrorMessage.PUSH_SUBSCRIPTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return pushSubscriptionById.toObject();
	}

	public async findAll(): Promise<{ items: PushSubscriptionResponseDto[] }> {
		const pushSubscriptions = await this.pushSubscriptionRepository.findAll();

		return {
			items: pushSubscriptions.map((pushSubscription) => {
				return pushSubscription.toObject();
			}),
		};
	}

	public async update(
		id: number,
		pushSubscription: PushSubscriptionRequestDto,
	): Promise<PushSubscriptionResponseDto> {
		const pushSubscriptionById = await this.pushSubscriptionRepository.find(id);

		if (!pushSubscriptionById) {
			throw new PushSubscriptionError({
				message: PushSubscriptionErrorMessage.PUSH_SUBSCRIPTION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { authKey, endpoint, expirationTime, p256dhKey } = pushSubscription;

		const updatedPushSubscription =
			await this.pushSubscriptionRepository.update(
				id,
				PushSubscriptionEntity.initializeNew({
					authKey,
					endpoint,
					expirationTime,
					p256dhKey,
				}),
			);

		return updatedPushSubscription.toObject();
	}
}

export { PushSubscriptionService };
