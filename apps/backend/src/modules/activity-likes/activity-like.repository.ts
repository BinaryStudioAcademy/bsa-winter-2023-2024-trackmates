import { type Repository } from "~/libs/types/types.js";

import { type ActivityLikeModel } from "./activity-like.model.js";
import { ActivityLikeEntity } from "./activity-like.entity.js";

class ActivityLikeRepository implements Repository<ActivityLikeEntity> {
	private activityLikeModel: typeof ActivityLikeModel;

	public constructor(activityLikeModel: typeof ActivityLikeModel) {
		this.activityLikeModel = activityLikeModel;
	}

	public async create(
		activityLike: ActivityLikeEntity,
	): Promise<ActivityLikeEntity> {
		const activityLikeModel = await this.activityLikeModel
			.query()
			.insert(activityLike.toNewObject())
			.returning("*")
			.castTo<ActivityLikeModel>()
			.execute();

		return ActivityLikeEntity.initialize({
			createdAt: activityLikeModel.createdAt,
			activityId: activityLikeModel.activityId,
			id: activityLikeModel.id,
			updatedAt: activityLikeModel.updatedAt,
			userId: activityLikeModel.userId,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deleteItemsCount = await this.activityLikeModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deleteItemsCount);
	}

	public async find(id: number): Promise<ActivityLikeEntity | null> {
		const activityLike = await this.activityLikeModel
			.query()
			.findById(id)
			.execute();

		return activityLike
			? ActivityLikeEntity.initialize({
					createdAt: activityLike.createdAt,
					activityId: activityLike.activityId,
					id: activityLike.id,
					updatedAt: activityLike.updatedAt,
					userId: activityLike.userId,
				})
			: null;
	}

	public async findAll(): Promise<ActivityLikeEntity[]> {
		const actinityLikes = await this.activityLikeModel.query().execute();

		return actinityLikes.map((activityLike) => {
			return ActivityLikeEntity.initialize({
				createdAt: activityLike.createdAt,
				activityId: activityLike.activityId,
				id: activityLike.id,
				updatedAt: activityLike.updatedAt,
				userId: activityLike.userId,
			});
		});
	}

	public async findByUserIdPostId(
		activityId: number,
		userId: number,
	): Promise<ActivityLikeEntity | null> {
		const activityLike = await this.activityLikeModel
			.query()
			.select()
			.findOne({ activityId, userId })
			.execute();

		return activityLike
			? ActivityLikeEntity.initialize({
					createdAt: activityLike.createdAt,
					activityId: activityLike.activityId,
					id: activityLike.id,
					updatedAt: activityLike.updatedAt,
					userId: activityLike.userId,
				})
			: null;
	}

	public async update(
		id: number,
		entity: ActivityLikeEntity,
	): Promise<ActivityLikeEntity> {
		const activityLike = entity.toNewObject();
		const activityLikeModel = await this.activityLikeModel
			.query()
			.findById(id)
			.patch(activityLike)
			.returning("*")
			.castTo<ActivityLikeModel>()
			.execute();

		return ActivityLikeEntity.initialize({
			createdAt: activityLikeModel.createdAt,
			activityId: activityLikeModel.activityId,
			id: activityLikeModel.id,
			updatedAt: activityLikeModel.updatedAt,
			userId: activityLikeModel.userId,
		});
	}
}

export { ActivityLikeRepository };
