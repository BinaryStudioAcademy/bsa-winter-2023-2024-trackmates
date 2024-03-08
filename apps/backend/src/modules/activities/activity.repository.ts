import { type QueryBuilder } from "objection";

import { SortOrder } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository, type ValueOf } from "~/libs/types/types.js";
import { type ActivityLikeModel } from "~/modules/activity-likes/activity-likes.js";
import { type CommentModel } from "~/modules/comments/comments.js";
import { UserEntity } from "~/modules/users/user.entity.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityModel } from "./activity.model.js";
import { EMPTY_COUNT } from "./libs/constants/constants.js";
import { type ActivityType, RelationName } from "./libs/enums/enums.js";
import { type ActivityCounts } from "./libs/types/types.js";

class ActivityRepository implements Repository<ActivityEntity> {
	private activityModel: typeof ActivityModel;

	public constructor(activityModel: typeof ActivityModel) {
		this.activityModel = activityModel;
	}

	private getCommentsCountQuery(): QueryBuilder<CommentModel> {
		return this.activityModel
			.relatedQuery<CommentModel>(RelationName.COMMENTS)
			.count()
			.as("commentCount");
	}

	private getLikesCountQuery(): QueryBuilder<ActivityLikeModel> {
		return this.activityModel
			.relatedQuery<ActivityLikeModel>(RelationName.LIKES)
			.count()
			.as("likesCount");
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
			commentCount: EMPTY_COUNT,
			id: activityModel.id,
			likesCount: EMPTY_COUNT,
			payload: activityModel.payload,
			type: activityModel.type,
			updatedAt: activityModel.updatedAt,
			user: null,
			userId: activityModel.userId,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedItemsCount = await this.activityModel
			.query()
			.findById(id)
			.delete()
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async deleteByKeyFields({
		actionId,
		type,
		userId,
	}: {
		actionId: number;
		type: ValueOf<typeof ActivityType>;
		userId: number;
	}): Promise<boolean> {
		const deletedItemsCount = await this.activityModel
			.query()
			.where({ actionId, type, userId })
			.delete()
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async find(id: number): Promise<ActivityEntity | null> {
		const activity = await this.activityModel
			.query()
			.findById(id)
			.select(`${DatabaseTableName.ACTIVITIES}.*`, this.getLikesCountQuery())
			.withGraphJoined(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.castTo<(ActivityModel & ActivityCounts) | undefined>()
			.execute();

		return activity
			? ActivityEntity.initialize({
					actionId: activity.actionId,
					commentCount: null,
					id: activity.id,
					likesCount: activity.likesCount,
					payload: activity.payload,
					type: activity.type,
					updatedAt: activity.updatedAt,
					user: UserEntity.initialize({
						avatarUrl: activity.user.userDetails.avatarFile?.url ?? null,
						createdAt: activity.user.createdAt,
						email: activity.user.email,
						firstName: activity.user.userDetails.firstName,
						id: activity.user.id,
						lastName: activity.user.userDetails.lastName,
						nickname: activity.user.userDetails.nickname,
						passwordHash: "",
						passwordSalt: "",
						sex: activity.user.userDetails.sex,
						updatedAt: activity.user.updatedAt,
					}),
					userId: activity.userId,
				})
			: null;
	}

	public async findAll(userId: number): Promise<ActivityEntity[]> {
		const activities = await this.activityModel
			.query()
			.select(`${DatabaseTableName.ACTIVITIES}.*`, this.getLikesCountQuery())
			.select(`${DatabaseTableName.ACTIVITIES}.*`, this.getCommentsCountQuery())
			.whereIn(
				`${DatabaseTableName.ACTIVITIES}.userId`,
				this.activityModel
					.query()
					.from(DatabaseTableName.FRIENDS)
					.select("followingId")
					.where({ followerId: userId }),
			)
			.withGraphJoined(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.orderBy("updatedAt", SortOrder.DESC)
			.castTo<(ActivityModel & ActivityCounts)[]>()
			.execute();

		return activities.map((activity) => {
			return ActivityEntity.initialize({
				actionId: activity.actionId,
				commentCount: activity.commentCount,
				id: activity.id,
				likesCount: activity.likesCount,
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
					sex: activity.user.userDetails.sex,
					updatedAt: activity.user.updatedAt,
				}),
				userId: activity.userId,
			});
		});
	}

	public async findByKeyFields({
		actionId,
		type,
		userId,
	}: {
		actionId: number;
		type: ValueOf<typeof ActivityType>;
		userId: number;
	}): Promise<ActivityEntity | null> {
		const activity = await this.activityModel
			.query()
			.findOne({ actionId, type, userId })
			.castTo<ActivityModel | undefined>()
			.execute();

		return activity
			? ActivityEntity.initialize({
					actionId: activity.actionId,
					commentCount: null,
					id: activity.id,
					likesCount: null,
					payload: activity.payload,
					type: activity.type,
					updatedAt: activity.updatedAt,
					user: null,
					userId: activity.userId,
				})
			: null;
	}

	public async update(
		id: number,
		activity: ActivityEntity,
	): Promise<ActivityEntity | null> {
		const updatedActivity = await this.activityModel
			.query()
			.findById(id)
			.patch(activity.toNewObject())
			.select(`${DatabaseTableName.ACTIVITIES}.*`, this.getLikesCountQuery())
			.select(`${DatabaseTableName.ACTIVITIES}.*`, this.getCommentsCountQuery())
			.returning("*")
			.castTo<(ActivityModel & ActivityCounts) | undefined>()
			.execute();

		return updatedActivity
			? ActivityEntity.initialize({
					actionId: updatedActivity.actionId,
					commentCount: updatedActivity.commentCount,
					id: updatedActivity.id,
					likesCount: updatedActivity.likesCount,
					payload: updatedActivity.payload,
					type: updatedActivity.type,
					updatedAt: updatedActivity.updatedAt,
					user: UserEntity.initialize({
						avatarUrl: updatedActivity.user.userDetails.avatarFile?.url || null,
						createdAt: updatedActivity.user.createdAt,
						email: updatedActivity.user.email,
						firstName: updatedActivity.user.userDetails.firstName,
						id: updatedActivity.user.id,
						lastName: updatedActivity.user.userDetails.lastName,
						nickname: updatedActivity.user.userDetails.nickname,
						passwordHash: "",
						passwordSalt: "",
						sex: updatedActivity.user.userDetails.sex,
						updatedAt: updatedActivity.user.updatedAt,
					}),
					userId: updatedActivity.userId,
				})
			: null;
	}
}

export { ActivityRepository };
