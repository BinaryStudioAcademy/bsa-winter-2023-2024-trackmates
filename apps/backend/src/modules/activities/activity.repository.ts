import { type Page, type QueryBuilder } from "objection";

import { SortOrder } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
	type Repository,
	type ValueOf,
} from "~/libs/types/types.js";
import { type ActivityLikeModel } from "~/modules/activity-likes/activity-likes.js";
import { type CommentModel } from "~/modules/comments/comments.js";
import { GroupEntity } from "~/modules/groups/groups.js";
import { PermissionEntity } from "~/modules/permissions/permissions.js";
import { SubscriptionEntity } from "~/modules/subscriptions/subscriptions.js";
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

	private getUserLikesCountQuery(
		userId: number,
	): QueryBuilder<ActivityLikeModel> {
		return this.activityModel
			.relatedQuery<ActivityLikeModel>(RelationName.LIKES)
			.where({ userId })
			.count()
			.as("userLikesCount");
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
			isLikedByUser: false,
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
			.select(`${DatabaseTableName.ACTIVITIES}.*`, this.getCommentsCountQuery())
			.withGraphJoined(
				`${RelationName.USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.castTo<(ActivityModel & ActivityCounts) | undefined>()
			.execute();

		return activity
			? ActivityEntity.initialize({
					actionId: activity.actionId,
					commentCount: activity.commentCount,
					id: activity.id,
					isLikedByUser: null,
					likesCount: activity.likesCount,
					payload: activity.payload,
					type: activity.type,
					updatedAt: activity.updatedAt,
					user: UserEntity.initialize({
						avatarUrl: activity.user.userDetails.avatarFile?.url ?? null,
						createdAt: activity.user.createdAt,
						email: activity.user.email,
						firstName: activity.user.userDetails.firstName,
						groups: activity.user.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: activity.user.id,
						lastName: activity.user.userDetails.lastName,
						nickname: activity.user.userDetails.nickname,
						passwordHash: "",
						passwordSalt: "",
						sex: activity.user.userDetails.sex,
						subscription: activity.user.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt: activity.user.userDetails.subscription.createdAt,
									expiresAt: activity.user.userDetails.subscription.expiresAt,
									id: activity.user.userDetails.subscription.id,
									updatedAt: activity.user.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: activity.user.updatedAt,
					}),
					userId: activity.userId,
				})
			: null;
	}

	public async findAll({
		count,
		page,
		userId,
	}: {
		userId: number;
	} & PaginationRequestDto): Promise<PaginationResponseDto<ActivityEntity>> {
		const { results, total } = await this.activityModel
			.query()
			.select(
				`${DatabaseTableName.ACTIVITIES}.*`,
				this.getLikesCountQuery(),
				this.getCommentsCountQuery(),
				this.getUserLikesCountQuery(userId),
			)
			.whereIn(
				`${DatabaseTableName.ACTIVITIES}.userId`,
				this.activityModel
					.query()
					.from(DatabaseTableName.FRIENDS)
					.select("followingId")
					.where({ followerId: userId }),
			)
			.orWhere(`${DatabaseTableName.ACTIVITIES}.userId`, userId)
			.withGraphJoined(
				`${RelationName.USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}]]`,
			)
			.orderBy("updatedAt", SortOrder.DESC)
			.page(page, count)
			.castTo<Page<ActivityModel & ActivityCounts>>()
			.execute();

		return {
			items: results.map((activity) => {
				return ActivityEntity.initialize({
					actionId: activity.actionId,
					commentCount: activity.commentCount,
					id: activity.id,
					isLikedByUser: Boolean(Number(activity.userLikesCount)),
					likesCount: activity.likesCount,
					payload: activity.payload,
					type: activity.type,
					updatedAt: activity.updatedAt,
					user: UserEntity.initialize({
						avatarUrl: activity.user.userDetails.avatarFile?.url || null,
						createdAt: activity.user.createdAt,
						email: activity.user.email,
						firstName: activity.user.userDetails.firstName,
						groups: [],
						id: activity.user.id,
						lastName: activity.user.userDetails.lastName,
						nickname: activity.user.userDetails.nickname,
						passwordHash: "",
						passwordSalt: "",
						sex: activity.user.userDetails.sex,
						subscription: activity.user.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt: activity.user.userDetails.subscription.createdAt,
									expiresAt: activity.user.userDetails.subscription.expiresAt,
									id: activity.user.userDetails.subscription.id,
									updatedAt: activity.user.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: activity.user.updatedAt,
					}),
					userId: activity.userId,
				});
			}),
			total,
		};
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
					isLikedByUser: null,
					likesCount: null,
					payload: activity.payload,
					type: activity.type,
					updatedAt: activity.updatedAt,
					user: null,
					userId: activity.userId,
				})
			: null;
	}

	public async findWithUserLike(
		id: number,
		userId: number,
	): Promise<ActivityEntity | null> {
		const activity = await this.activityModel
			.query()
			.findById(id)
			.select(
				`${DatabaseTableName.ACTIVITIES}.*`,
				this.getLikesCountQuery(),
				this.getCommentsCountQuery(),
				this.getUserLikesCountQuery(userId),
			)
			.withGraphJoined(
				`${RelationName.USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.castTo<(ActivityModel & ActivityCounts) | undefined>()
			.execute();

		return activity
			? ActivityEntity.initialize({
					actionId: activity.actionId,
					commentCount: activity.commentCount,
					id: activity.id,
					isLikedByUser: Boolean(Number(activity.userLikesCount)),
					likesCount: activity.likesCount,
					payload: activity.payload,
					type: activity.type,
					updatedAt: activity.updatedAt,
					user: UserEntity.initialize({
						avatarUrl: activity.user.userDetails.avatarFile?.url ?? null,
						createdAt: activity.user.createdAt,
						email: activity.user.email,
						firstName: activity.user.userDetails.firstName,
						groups: activity.user.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: activity.user.id,
						lastName: activity.user.userDetails.lastName,
						nickname: activity.user.userDetails.nickname,
						passwordHash: "",
						passwordSalt: "",
						sex: activity.user.userDetails.sex,
						subscription: activity.user.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt: activity.user.userDetails.subscription.createdAt,
									expiresAt: activity.user.userDetails.subscription.expiresAt,
									id: activity.user.userDetails.subscription.id,
									updatedAt: activity.user.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: activity.user.updatedAt,
					}),
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
			.withGraphJoined(
				`${RelationName.USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.castTo<(ActivityModel & ActivityCounts) | undefined>()
			.execute();

		return updatedActivity
			? ActivityEntity.initialize({
					actionId: updatedActivity.actionId,
					commentCount: updatedActivity.commentCount,
					id: updatedActivity.id,
					isLikedByUser: null,
					likesCount: updatedActivity.likesCount,
					payload: updatedActivity.payload,
					type: updatedActivity.type,
					updatedAt: updatedActivity.updatedAt,
					user: UserEntity.initialize({
						avatarUrl: updatedActivity.user.userDetails.avatarFile?.url || null,
						createdAt: updatedActivity.user.createdAt,
						email: updatedActivity.user.email,
						firstName: updatedActivity.user.userDetails.firstName,
						groups: updatedActivity.user.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: updatedActivity.user.id,
						lastName: updatedActivity.user.userDetails.lastName,
						nickname: updatedActivity.user.userDetails.nickname,
						passwordHash: "",
						passwordSalt: "",
						sex: updatedActivity.user.userDetails.sex,
						subscription: updatedActivity.user.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										updatedActivity.user.userDetails.subscription.createdAt,
									expiresAt:
										updatedActivity.user.userDetails.subscription.expiresAt,
									id: updatedActivity.user.userDetails.subscription.id,
									updatedAt:
										updatedActivity.user.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: updatedActivity.user.updatedAt,
					}),
					userId: updatedActivity.userId,
				})
			: null;
	}
}

export { ActivityRepository };
