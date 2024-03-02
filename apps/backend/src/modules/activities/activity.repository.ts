import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityModel } from "./activity.model.js";
import { type ActivityType } from "./libs/types/types.js";

class ActivityRepository
	implements Omit<Repository<ActivityEntity>, "find" | "update">
{
	private activityModel: typeof ActivityModel;

	public constructor(activityModel: typeof ActivityModel) {
		this.activityModel = activityModel;
	}

	public async create(activity: ActivityEntity): Promise<ActivityEntity> {
		const activityModel = await this.activityModel
			.query()
			.insert(activity.toNewObject())
			.returning("*")
			.castTo<ActivityModel>()
			.execute();

		return ActivityEntity.initialize({
			actionId: activityModel.actionId,
			id: activityModel.id,
			payload: activityModel.payload,
			type: activityModel.type,
			updatedAt: activityModel.updatedAt,
			user: null,
			userId: activityModel.userId,
		});
	}

	public async delete({
		actionId,
		type,
		userId,
	}: {
		actionId: number;
		type: ActivityType;
		userId: number;
	}): Promise<boolean> {
		const deletedItemsCount = await this.activityModel
			.query()
			.where({ actionId, type, userId })
			.delete()
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async findAll(userId: number): Promise<ActivityEntity[]> {
		const activities = await this.activityModel
			.query()
			.whereIn(
				`${DatabaseTableName.ACTIVITIES}.userId`,
				this.activityModel
					.query()
					.from(DatabaseTableName.FRIENDS)
					.select("followingId")
					.where({ followerId: userId }),
			)
			.withGraphJoined("user.userDetails.avatarFile")
			.orderBy("updatedAt", "DESC")
			.castTo<ActivityModel[]>()
			.execute();

		return activities.map((activity) =>
			ActivityEntity.initialize({
				actionId: activity.actionId,
				id: activity.id,
				payload: activity.payload,
				type: activity.type,
				updatedAt: activity.updatedAt,
				user: UserEntity.initialize({
					avatarUrl: activity.user.userDetails.avatarFile?.url || null,
					createdAt: activity.user.createdAt,
					email: activity.user.email,
					firstName: activity.user.userDetails.firstName,
					id: activity.user.id,
					lastName: activity.user.userDetails.lastName,
					nickname: activity.user.userDetails.nickname,
					passwordHash: "",
					passwordSalt: "",
					updatedAt: activity.user.updatedAt,
				}),
				userId: activity.userId,
			}),
		);
	}
}

export { ActivityRepository };
