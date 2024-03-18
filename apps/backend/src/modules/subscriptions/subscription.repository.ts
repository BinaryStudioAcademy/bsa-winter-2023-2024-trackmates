import { type Repository } from "~/libs/types/types.js";

import { SubscriptionEntity } from "./subscription.entity.js";
import { type SubscriptionModel } from "./subscription.model.js";

class SubscriptionRepository implements Repository<SubscriptionEntity> {
	private subscriptionModel: typeof SubscriptionModel;

	public constructor(subscriptionModel: typeof SubscriptionModel) {
		this.subscriptionModel = subscriptionModel;
	}

	public async create(
		subscriptionEntity: SubscriptionEntity,
	): Promise<SubscriptionEntity> {
		const { expiresAt } = subscriptionEntity.toNewObject();

		const subscription = await this.subscriptionModel
			.query()
			.insert({
				expiresAt,
			})
			.returning("*")
			.execute();

		return SubscriptionEntity.initialize({
			createdAt: subscription.createdAt,
			expiresAt: subscription.expiresAt,
			id: subscription.id,
			updatedAt: subscription.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedItemsCount = await this.subscriptionModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async deleteExpiredSubscriptions(): Promise<boolean> {
		const currentDate = new Date().toISOString();

		const deletedItemsCount = await this.subscriptionModel
			.query()
			.where("expires_at", "<=", currentDate)
			.delete();

		return Boolean(deletedItemsCount);
	}

	public async find(id: number): Promise<SubscriptionEntity | null> {
		const subscription = await this.subscriptionModel
			.query()
			.findById(id)
			.execute();

		if (!subscription) {
			return null;
		}

		return SubscriptionEntity.initialize({
			createdAt: subscription.createdAt,
			expiresAt: subscription.expiresAt,
			id: subscription.id,
			updatedAt: subscription.updatedAt,
		});
	}

	public async findAll(): Promise<SubscriptionEntity[]> {
		const subscriptions = await this.subscriptionModel.query().execute();

		return subscriptions.map((subscription) => {
			return SubscriptionEntity.initialize({
				createdAt: subscription.createdAt,
				expiresAt: subscription.expiresAt,
				id: subscription.id,
				updatedAt: subscription.updatedAt,
			});
		});
	}

	public async update(
		id: number,
		entity: SubscriptionEntity,
	): Promise<SubscriptionEntity> {
		const subscriptionPayload = entity.toNewObject();

		const subscription = await this.subscriptionModel
			.query()
			.patchAndFetchById(id, subscriptionPayload)
			.execute();

		return SubscriptionEntity.initialize({
			createdAt: subscription.createdAt,
			expiresAt: subscription.expiresAt,
			id: subscription.id,
			updatedAt: subscription.updatedAt,
		});
	}
}

export { SubscriptionRepository };
