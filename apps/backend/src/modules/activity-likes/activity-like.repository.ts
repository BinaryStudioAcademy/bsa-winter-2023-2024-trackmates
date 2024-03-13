import { type Repository } from "~/libs/types/types.js";

import { ActivityLikeEntity } from "./activity-like.entity.js";
import { type ActivityLikeModel } from "./activity-like.model.js";

class ActivityLikeRepository implements Repository<ActivityLikeEntity> {
	private activityLikeModel: typeof ActivityLikeModel;

	public constructor(activityLikeModel: typeof ActivityLikeModel) {
		this.activityLikeModel = activityLikeModel;
	}

	public async create(
		activityLike: ActivityLikeEntity,
	): Promise<ActivityLikeEntity> {
		const { activityId, userId } = activityLike.toNewObject();

		const activityLikeModel = await this.activityLikeModel
			.query()
			.insert({
				activityId,
				userId,
			})
			.returning("*")
			.execute();

		return ActivityLikeEntity.initialize({
			activityId: activityLikeModel.activityId,
			createdAt: activityLikeModel.createdAt,
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
					activityId: activityLike.activityId,
					createdAt: activityLike.createdAt,
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
				activityId: activityLike.activityId,
				createdAt: activityLike.createdAt,
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
					activityId: activityLike.activityId,
					createdAt: activityLike.createdAt,
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
			.patchAndFetchById(id, activityLike)
			.execute();

		return ActivityLikeEntity.initialize({
			activityId: activityLikeModel.activityId,
			createdAt: activityLikeModel.createdAt,
			id: activityLikeModel.id,
			updatedAt: activityLikeModel.updatedAt,
			userId: activityLikeModel.userId,
		});
	}
}

export { ActivityLikeRepository };
