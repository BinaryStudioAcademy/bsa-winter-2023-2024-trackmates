import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";
import { EMPTY_ARRAY_LENGTH } from "~/libs/types/types.js";
import { GroupEntity } from "~/modules/groups/group.entity.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

class FriendRepository implements Repository<UserEntity> {
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	public async checkIsMutualFollowersByIds(
		firstUserId: number,
		secondUserId: number,
	): Promise<boolean> {
		const [firstUserSubscription, secondUserSubscription] = await this.userModel
			.query()
			.from(DatabaseTableName.FRIENDS)
			.where({ followerId: firstUserId, followingId: secondUserId })
			.orWhere({ followerId: secondUserId, followingId: firstUserId })
			.execute();

		const isFirstUserSubscribed = Boolean(firstUserSubscription);
		const isSecondUserSubscribed = Boolean(secondUserSubscription);

		return isFirstUserSubscribed && isSecondUserSubscribed;
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
			.withGraphJoined("userDetails")
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
					updatedAt: group.updatedAt,
				});
			}),
			id: followingUser.id,
			lastName: followingUser.userDetails.lastName,
			nickname: followingUser.userDetails.nickname,
			passwordHash: followingUser.passwordHash,
			passwordSalt: followingUser.passwordSalt,
			updatedAt: followingUser.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.userModel
			.query()
			.from(DatabaseTableName.FRIENDS)
			.select("*")
			.where({
				id: id,
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
			.withGraphJoined("userDetails")
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
							updatedAt: group.updatedAt,
						});
					}),
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const followings = await this.userModel
			.query()
			.join(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.following_id`,
			)
			.withGraphJoined("userDetails");

		return followings.map((user) => {
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
						updatedAt: group.updatedAt,
					});
				}),
				id: user.id,
				lastName: user.userDetails.lastName,
				nickname: user.userDetails.nickname,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			});
		});
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

		return userFollowings.length > EMPTY_ARRAY_LENGTH;
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

	public async getPotentialFollowers(id: number): Promise<UserEntity[]> {
		const potentialFollowers = await this.userModel
			.query()
			.where("users.id", "<>", id)
			.leftJoin(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.following_id`,
			)
			.whereNotIn(
				"users.id",
				this.userModel
					.query()
					.select("users.id")
					.leftJoin(
						DatabaseTableName.FRIENDS,
						`${DatabaseTableName.USERS}.id`,
						"=",
						`${DatabaseTableName.FRIENDS}.following_id`,
					)
					.where(`${DatabaseTableName.FRIENDS}.follower_id`, "=", id)
					.whereNotNull(`${DatabaseTableName.FRIENDS}.follower_id`),
			)
			.distinct()
			.withGraphJoined("userDetails");

		return potentialFollowers.map((user) => {
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
						updatedAt: group.updatedAt,
					});
				}),
				id: user.id,
				lastName: user.userDetails.lastName,
				nickname: user.userDetails.nickname,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			});
		});
	}

	public async getUserFollowers(id: number): Promise<UserEntity[]> {
		const userFollowers = await this.userModel
			.query()
			.leftJoin(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.follower_id`,
			)
			.where(`${DatabaseTableName.FRIENDS}.following_id`, "=", id)
			.withGraphJoined("userDetails");

		return userFollowers.map((user) => {
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
						updatedAt: group.updatedAt,
					});
				}),
				id: user.id,
				lastName: user.userDetails.lastName,
				nickname: user.userDetails.nickname,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			});
		});
	}

	public async getUserFollowings(id: number): Promise<UserEntity[]> {
		const userFollowings = await this.userModel
			.query()
			.leftJoin(
				DatabaseTableName.FRIENDS,
				`${DatabaseTableName.USERS}.id`,
				"=",
				`${DatabaseTableName.FRIENDS}.following_id`,
			)
			.where(`${DatabaseTableName.FRIENDS}.follower_id`, "=", id)
			.withGraphJoined("userDetails");

		return userFollowings.map((user) => {
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
						updatedAt: group.updatedAt,
					});
				}),
				id: user.id,
				lastName: user.userDetails.lastName,
				nickname: user.userDetails.nickname,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			});
		});
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
					updatedAt: group.updatedAt,
				});
			}),
			id: updatedSubscription.id,
			lastName: updatedSubscription.userDetails.lastName,
			nickname: updatedSubscription.userDetails.nickname,
			passwordHash: updatedSubscription.passwordHash,
			passwordSalt: updatedSubscription.passwordSalt,
			updatedAt: updatedSubscription.updatedAt,
		});
	}
}

export { FriendRepository };
