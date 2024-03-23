import { type QueryBuilder } from "objection";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { SortOrder } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import {
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { GroupEntity } from "~/modules/groups/group.entity.js";
import { PermissionEntity } from "~/modules/permissions/permissions.js";
import { SubscriptionEntity } from "~/modules/subscriptions/subscriptions.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { RelationName } from "./libs/enums/enums.js";

class FriendRepository implements Repository<UserEntity> {
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	private filterBySearch(
		builder: QueryBuilder<UserModel>,
		search: string,
	): void {
		void builder
			.whereILike("userDetails.firstName", `%${search}%`)
			.orWhereILike("userDetails.lastName", `%${search}%`)
			.orWhereRaw("concat(??, ' ', ??) ILIKE ?", [
				"userDetails.firstName",
				"userDetails.lastName",
				`%${search}%`,
			]);
	}

	public async create({
		followerUserId,
		followingUserId,
	}: {
		followerUserId: number;
		followingUserId: number;
	}): Promise<UserEntity> {
		await this.userModel
			.relatedQuery("friends")
			.for(followerUserId)
			.relate(followingUserId);

		const followingUser = await this.userModel
			.query()
			.findById(followingUserId)
			.withGraphJoined(
				`[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.castTo<UserModel>();

		return UserEntity.initialize({
			avatarUrl: followingUser.userDetails.avatarFile?.url ?? null,
			createdAt: followingUser.createdAt,
			email: followingUser.email,
			firstName: followingUser.userDetails.firstName,
			groups: followingUser.groups.map((group) => {
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
			id: followingUser.id,
			lastName: followingUser.userDetails.lastName,
			nickname: followingUser.userDetails.nickname,
			passwordHash: followingUser.passwordHash,
			passwordSalt: followingUser.passwordSalt,
			sex: followingUser.userDetails.sex,
			subscription: followingUser.userDetails.subscription
				? SubscriptionEntity.initialize({
						createdAt: followingUser.userDetails.subscription.createdAt,
						expiresAt: followingUser.userDetails.subscription.expiresAt,
						id: followingUser.userDetails.subscription.id,
						updatedAt: followingUser.userDetails.subscription.updatedAt,
					})
				: null,
			updatedAt: followingUser.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.userModel
			.query()
			.from(DatabaseTableName.FRIENDS)
			.select("*")
			.where({
				id,
			})
			.first()
			.delete();

		return Boolean(isDeleted);
	}

	public async deleteSubscription(
		id: number,
		userId: number,
	): Promise<boolean> {
		const deletedSubscription = await this.userModel
			.query()
			.from(DatabaseTableName.FRIENDS)
			.select("*")
			.where({
				followerId: id,
				followingId: userId,
			})
			.first()
			.delete();

		return Boolean(deletedSubscription);
	}

	public async find(id: number): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphJoined(
				`[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					groups: user.groups.map((group) => {
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
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					sex: user.userDetails.sex,
					subscription: user.userDetails.subscription
						? SubscriptionEntity.initialize({
								createdAt: user.userDetails.subscription.createdAt,
								expiresAt: user.userDetails.subscription.expiresAt,
								id: user.userDetails.subscription.id,
								updatedAt: user.userDetails.subscription.updatedAt,
							})
						: null,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<{ items: UserEntity[] }> {
		const followings = await this.userModel
			.query()
			.join(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.following_id`,
			)
			.withGraphJoined(
				`[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			);

		return {
			items: followings.map((user) => {
				return UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					groups: user.groups.map((group) => {
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
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					sex: user.userDetails.sex,
					subscription: user.userDetails.subscription
						? SubscriptionEntity.initialize({
								createdAt: user.userDetails.subscription.createdAt,
								expiresAt: user.userDetails.subscription.expiresAt,
								id: user.userDetails.subscription.id,
								updatedAt: user.userDetails.subscription.updatedAt,
							})
						: null,
					updatedAt: user.updatedAt,
				});
			}),
		};
	}

	public async getIsFollowing(
		currentUserId: number,
		otherUserId: number,
	): Promise<boolean> {
		const userFollowings = await this.userModel
			.query()
			.leftJoin(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.following_id`,
			)
			.where(`${DatabaseTableName.FRIENDS}.follower_id`, "=", currentUserId)
			.where(`${DatabaseTableName.FRIENDS}.following_id`, "=", otherUserId);

		return userFollowings.length > EMPTY_LENGTH;
	}

	public async getIsSubscribedByRequestId(
		id: number,
		userId: number,
	): Promise<boolean> {
		const subscription = await this.userModel
			.query()
			.from(DatabaseTableName.FRIENDS)
			.select("*")
			.where({
				follower_id: id,
				following_id: userId,
			})
			.first();

		return Boolean(subscription);
	}

	public async getPotentialFollowers({
		count,
		id,
		page,
		search,
	}: {
		count: number;
		id: number;
		page: number;
		search: string;
	}): Promise<PaginationResponseDto<UserEntity>> {
		const { results, total } = await this.userModel
			.query()
			.whereNotIn(`${DatabaseTableName.USERS}.id`, (builder) => {
				void builder
					.select("followingId")
					.from(DatabaseTableName.FRIENDS)
					.where({ followerId: id });
			})
			.andWhereNot({ [`${DatabaseTableName.USERS}.id`]: id })
			.andWhere((builder) => {
				this.filterBySearch(builder, search);
			})
			.innerJoinRelated(RelationName.USER_DETAILS)
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.orderBy(`${DatabaseTableName.USERS}.id`, SortOrder.DESC)
			.page(page, count);

		return {
			items: results.map((user) => {
				return UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					groups: user.groups.map((group) => {
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
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					sex: user.userDetails.sex,
					subscription: user.userDetails.subscription
						? SubscriptionEntity.initialize({
								createdAt: user.userDetails.subscription.createdAt,
								expiresAt: user.userDetails.subscription.expiresAt,
								id: user.userDetails.subscription.id,
								updatedAt: user.userDetails.subscription.updatedAt,
							})
						: null,
					updatedAt: user.updatedAt,
				});
			}),
			total,
		};
	}

	public async getUserFollowers({
		count,
		id,
		page,
		search,
	}: {
		count: number;
		id: number;
		page: number;
		search: string;
	}): Promise<PaginationResponseDto<UserEntity>> {
		const { results, total } = await this.userModel
			.query()
			.innerJoin(DatabaseTableName.FRIENDS, (join) => {
				join
					.on(
						`${DatabaseTableName.USERS}.id`,
						`${DatabaseTableName.FRIENDS}.followerId`,
					)
					.andOnVal(`${DatabaseTableName.FRIENDS}.followingId`, id);
			})
			.innerJoinRelated(RelationName.USER_DETAILS)
			.where((builder) => {
				this.filterBySearch(builder, search);
			})
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.orderBy(`${DatabaseTableName.FRIENDS}.updatedAt`, SortOrder.DESC)
			.page(page, count);

		return {
			items: results.map((user) => {
				return UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					groups: user.groups.map((group) => {
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
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					sex: user.userDetails.sex,
					subscription: user.userDetails.subscription
						? SubscriptionEntity.initialize({
								createdAt: user.userDetails.subscription.createdAt,
								expiresAt: user.userDetails.subscription.expiresAt,
								id: user.userDetails.subscription.id,
								updatedAt: user.userDetails.subscription.updatedAt,
							})
						: null,
					updatedAt: user.updatedAt,
				});
			}),
			total,
		};
	}

	public async getUserFollowings({
		count,
		id,
		page,
		search,
	}: {
		count: number;
		id: number;
		page: number;
		search: string;
	}): Promise<PaginationResponseDto<UserEntity>> {
		const { results, total } = await this.userModel
			.query()
			.innerJoin(DatabaseTableName.FRIENDS, (join) => {
				join
					.on(
						`${DatabaseTableName.USERS}.id`,
						`${DatabaseTableName.FRIENDS}.followingId`,
					)
					.andOnVal(`${DatabaseTableName.FRIENDS}.followerId`, id);
			})
			.innerJoinRelated(RelationName.USER_DETAILS)
			.where((builder) => {
				this.filterBySearch(builder, search);
			})
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]`,
			)
			.orderBy(`${DatabaseTableName.FRIENDS}.updatedAt`, SortOrder.DESC)
			.page(page, count);

		return {
			items: results.map((user) => {
				return UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					groups: user.groups.map((group) => {
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
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					sex: user.userDetails.sex,
					subscription: user.userDetails.subscription
						? SubscriptionEntity.initialize({
								createdAt: user.userDetails.subscription.createdAt,
								expiresAt: user.userDetails.subscription.expiresAt,
								id: user.userDetails.subscription.id,
								updatedAt: user.userDetails.subscription.updatedAt,
							})
						: null,
					updatedAt: user.updatedAt,
				});
			}),
			total,
		};
	}

	public async getUserFollowingsIds(id: number): Promise<number[]> {
		const followingsIdsResult = await this.userModel
			.query()
			.leftJoin(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.following_id`,
			)
			.where(`${DatabaseTableName.FRIENDS}.follower_id`, "=", id)
			.select(`${DatabaseTableName.FRIENDS}.following_id as id`);

		return followingsIdsResult.map((row) => row.id);
	}

	public async update(id: number): Promise<UserEntity> {
		const updatedSubscription = await this.userModel
			.query()
			.withGraphFetched("userDetails")
			.patchAndFetchById(id, {
				id,
			});

		return UserEntity.initialize({
			avatarUrl: updatedSubscription.userDetails.avatarFile?.url ?? null,
			createdAt: updatedSubscription.createdAt,
			email: updatedSubscription.email,
			firstName: updatedSubscription.userDetails.firstName,
			groups: updatedSubscription.groups.map((group) => {
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
			id: updatedSubscription.id,
			lastName: updatedSubscription.userDetails.lastName,
			nickname: updatedSubscription.userDetails.nickname,
			passwordHash: updatedSubscription.passwordHash,
			passwordSalt: updatedSubscription.passwordSalt,
			sex: updatedSubscription.userDetails.sex,
			subscription: updatedSubscription.userDetails.subscription
				? SubscriptionEntity.initialize({
						createdAt: updatedSubscription.userDetails.subscription.createdAt,
						expiresAt: updatedSubscription.userDetails.subscription.expiresAt,
						id: updatedSubscription.userDetails.subscription.id,
						updatedAt: updatedSubscription.userDetails.subscription.updatedAt,
					})
				: null,
			updatedAt: updatedSubscription.updatedAt,
		});
	}
}

export { FriendRepository };
