import { type Repository } from "~/libs/types/types.js";

import { PushSubscriptionEntity } from "./push-subscription.entity.js";
import { type PushSubscriptionModel } from "./push-subscription.model.js";

class PushSubscriptionRepository implements Repository<PushSubscriptionEntity> {
	private pushSubscriptionModel: typeof PushSubscriptionModel;

	public constructor(pushSubscriptionModel: typeof PushSubscriptionModel) {
		this.pushSubscriptionModel = pushSubscriptionModel;
	}
	public async create(
		pushSubscription: PushSubscriptionEntity,
	): Promise<PushSubscriptionEntity> {
		const { authKey, endpoint, expirationTime, p256dhKey } =
			pushSubscription.toNewObject();

		const existingPushSubscription = await this.findByAuthKey(authKey);
		const hasExistingPushSubscription = Boolean(existingPushSubscription);

		if (hasExistingPushSubscription) {
			return existingPushSubscription as PushSubscriptionEntity;
		}

		const createdPushSubscription = await this.pushSubscriptionModel
			.query()
			.insert({ authKey, endpoint, expirationTime, p256dhKey })
			.returning("*")
			.execute();

		return PushSubscriptionEntity.initialize({
			authKey: createdPushSubscription.authKey,
			createdAt: createdPushSubscription.createdAt,
			endpoint: createdPushSubscription.endpoint,
			expirationTime: createdPushSubscription.expirationTime,
			id: createdPushSubscription.id,
			p256dhKey: createdPushSubscription.p256dhKey,
			updatedAt: createdPushSubscription.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPushSubscription = await this.pushSubscriptionModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedPushSubscription);
	}

	public async find(id: number): Promise<PushSubscriptionEntity | null> {
		const pushSubscriptionById = await this.pushSubscriptionModel
			.query()
			.findById(id)
			.execute();

		return pushSubscriptionById
			? PushSubscriptionEntity.initialize({
					authKey: pushSubscriptionById.authKey,
					createdAt: pushSubscriptionById.createdAt,
					endpoint: pushSubscriptionById.endpoint,
					expirationTime: pushSubscriptionById.expirationTime,
					id: pushSubscriptionById.id,
					p256dhKey: pushSubscriptionById.p256dhKey,
					updatedAt: pushSubscriptionById.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<PushSubscriptionEntity[]> {
		const pushSubscriptions = await this.pushSubscriptionModel
			.query()
			.execute();

		return pushSubscriptions.map((pushSubscription) => {
			return PushSubscriptionEntity.initialize({
				authKey: pushSubscription.authKey,
				createdAt: pushSubscription.createdAt,
				endpoint: pushSubscription.endpoint,
				expirationTime: pushSubscription.expirationTime,
				id: pushSubscription.id,
				p256dhKey: pushSubscription.p256dhKey,
				updatedAt: pushSubscription.updatedAt,
			});
		});
	}

	public async findByAuthKey(
		authKey: string,
	): Promise<PushSubscriptionEntity | null> {
		const pushSubscription = await this.pushSubscriptionModel
			.query()
			.findOne({ authKey })
			.execute();

		return pushSubscription
			? PushSubscriptionEntity.initialize({
					authKey: pushSubscription.authKey,
					createdAt: pushSubscription.createdAt,
					endpoint: pushSubscription.endpoint,
					expirationTime: pushSubscription.expirationTime,
					id: pushSubscription.id,
					p256dhKey: pushSubscription.p256dhKey,
					updatedAt: pushSubscription.updatedAt,
				})
			: null;
	}

	public async update(
		id: number,
		entity: PushSubscriptionEntity,
	): Promise<PushSubscriptionEntity> {
		const { authKey, endpoint, expirationTime, p256dhKey } =
			entity.toNewObject();
		const updatedPushSubscription = await this.pushSubscriptionModel
			.query()
			.updateAndFetchById(id, { authKey, endpoint, expirationTime, p256dhKey });

		return PushSubscriptionEntity.initialize({
			authKey: updatedPushSubscription.authKey,
			createdAt: updatedPushSubscription.createdAt,
			endpoint: updatedPushSubscription.endpoint,
			expirationTime: updatedPushSubscription.expirationTime,
			id: updatedPushSubscription.id,
			p256dhKey: updatedPushSubscription.p256dhKey,
			updatedAt: updatedPushSubscription.updatedAt,
		});
	}
}

export { PushSubscriptionRepository };
