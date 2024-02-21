import { type Repository } from "~/libs/types/types.js";
import { type FriendModel } from "~/modules/friends/friend.model.js";

import { UserEntity } from "../users/user.entity.js";
import { UserModel } from "../users/user.model.js";
import { FriendsEntity } from "./friend.entity.js";

class FriendRepository implements Repository<FriendsEntity> {
	private friendModel: typeof FriendModel;
	private userModel: typeof UserModel;

	public constructor(
		friendModel: typeof FriendModel,
		userModel: typeof UserModel,
	) {
		this.friendModel = friendModel;
		this.userModel = userModel;
	}

	public async create(entity: FriendsEntity): Promise<FriendsEntity> {
		const { recipientUserId, senderUserId } = entity.toNewObject();

		const subscription = await this.friendModel
			.query()
			.insert({
				recipientUserId,
				senderUserId,
			})
			.returning("*")
			.execute();

		return FriendsEntity.initialize({
			createdAt: subscription.createdAt,
			id: subscription.id,
			isFollowing: subscription.isFollowing,
			recipientUser: subscription.recipientUser ?? null,
			recipientUserId: subscription.recipientUserId,
			senderUser: subscription.senderUser ?? null,
			senderUserId: subscription.senderUserId,
			updatedAt: subscription.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedSubscribe = await this.friendModel.query().deleteById(id);

		return deletedSubscribe ? true : false;
	}

	public async find(id: number): Promise<FriendsEntity | null> {
		const subscription = await this.friendModel.query().findById(id);

		return subscription
			? FriendsEntity.initialize({
					createdAt: subscription.createdAt,
					id: subscription.id,
					isFollowing: subscription.isFollowing,
					recipientUser: subscription.recipientUser ?? null,
					recipientUserId: subscription.recipientUserId,
					senderUser: subscription.senderUser ?? null,
					senderUserId: subscription.senderUserId,
					updatedAt: subscription.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<FriendsEntity[]> {
		const subscriptions = await this.friendModel.query();

		return subscriptions.map((subscription) =>
			FriendsEntity.initialize({
				createdAt: subscription.createdAt,
				id: subscription.id,
				isFollowing: subscription.isFollowing,
				recipientUser: subscription.recipientUser ?? null,
				recipientUserId: subscription.recipientUserId,
				senderUser: subscription.senderUser ?? null,
				senderUserId: subscription.senderUserId,
				updatedAt: subscription.updatedAt,
			}),
		);
	}

	public async getPotentialFollowers(id: number): Promise<UserEntity[]> {
		const filteredFollowers = await this.userModel
			.query()
			.whereNot("users.id", id)
			.withGraphJoined("userDetails")
			.withGraphJoined("recipientUser")
			.whereNotExists(
				UserModel.relatedQuery("recipientUser")
					.where("isFollowing", true)
					.andWhere("senderUserId", id),
			);

		return filteredFollowers.map((user) =>
			UserEntity.initialize({
				createdAt: user.createdAt,
				email: user.email,
				firstName: user.userDetails.firstName,
				id: user.id,
				lastName: user.userDetails.lastName,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
			}),
		);
	}

	async getSubscribeByRequestId(
		id: number,
		userId: number,
	): Promise<FriendsEntity | null> {
		const subscription = await this.friendModel
			.query()
			.where({
				recipientUserId: id,
				senderUserId: userId,
			})
			.first();

		return subscription
			? FriendsEntity.initialize({
					createdAt: subscription.createdAt,
					id: subscription.id,
					isFollowing: subscription.isFollowing,
					recipientUser: subscription.recipientUser ?? null,
					recipientUserId: subscription.recipientUserId,
					senderUser: subscription.senderUser ?? null,
					senderUserId: subscription.senderUserId,
					updatedAt: subscription.updatedAt,
				})
			: null;
	}

	public async getSubscribeByUserId(
		id: number,
		recipientUserId: number,
	): Promise<FriendsEntity | null> {
		const friendRequest = await this.friendModel
			.query()
			.where({
				recipientUserId: recipientUserId,
				senderUserId: id,
			})
			.first();

		return friendRequest
			? FriendsEntity.initialize({
					createdAt: friendRequest.createdAt,
					id: friendRequest.id,
					isFollowing: friendRequest.isFollowing,
					recipientUser: friendRequest.recipientUser ?? null,
					recipientUserId: friendRequest.recipientUserId,
					senderUser: friendRequest.senderUser ?? null,
					senderUserId: friendRequest.senderUserId,
					updatedAt: friendRequest.updatedAt,
				})
			: null;
	}

	public async getUserFollowers(id: number): Promise<UserEntity[]> {
		const userFollowers = await this.friendModel
			.query()
			.where("recipientUserId", id)
			.where("isFollowing", true)
			.withGraphJoined("senderUser")
			.withGraphFetched("senderUser.userDetails");

		const users = userFollowers.map((friend) => {
			const userDetails = friend.senderUser?.userDetails;

			return friend.senderUser && userDetails
				? UserEntity.initialize({
						createdAt: friend.senderUser.createdAt,
						email: friend.senderUser.email,
						firstName: userDetails.firstName,
						id: friend.senderUser.id,
						lastName: userDetails.lastName,
						passwordHash: friend.senderUser.passwordHash,
						passwordSalt: friend.senderUser.passwordSalt,
						updatedAt: friend.senderUser.updatedAt,
					})
				: null;
		});

		return users as UserEntity[];
	}

	public async getUserFollowings(id: number): Promise<UserEntity[]> {
		const userFollowers = await this.friendModel
			.query()
			.where("senderUserId", id)
			.where("isFollowing", true)
			.withGraphJoined("recipientUser")
			.withGraphFetched("recipientUser.userDetails");

		const users = userFollowers.map((friend) => {
			const userDetails = friend.recipientUser?.userDetails;

			return friend.recipientUser && userDetails
				? UserEntity.initialize({
						createdAt: friend.recipientUser.createdAt,
						email: friend.recipientUser.email,
						firstName: userDetails.firstName,
						id: friend.recipientUser.id,
						lastName: userDetails.lastName,
						passwordHash: friend.recipientUser.passwordHash,
						passwordSalt: friend.recipientUser.passwordSalt,
						updatedAt: friend.recipientUser.updatedAt,
					})
				: null;
		});

		return users as UserEntity[];
	}

	public async update(id: number): Promise<FriendsEntity | null> {
		const subscription = await this.friendModel.query().findById(id);

		if (subscription) {
			const currentFollowingStatus = subscription.isFollowing;
			const updatedSubscription = await this.friendModel
				.query()
				.patchAndFetchById(id, {
					isFollowing: !currentFollowingStatus,
				});

			return FriendsEntity.initialize({
				createdAt: updatedSubscription.createdAt,
				id: updatedSubscription.id,
				isFollowing: updatedSubscription.isFollowing,
				recipientUser: updatedSubscription.recipientUser ?? null,
				recipientUserId: updatedSubscription.recipientUserId,
				senderUser: updatedSubscription.senderUser ?? null,
				senderUserId: updatedSubscription.senderUserId,
				updatedAt: updatedSubscription.updatedAt,
			});
		}

		return null;
	}
}

export { FriendRepository };
