import { type Repository } from "~/libs/types/types.js";
import { type FriendModel } from "~/modules/friends/friend.model.js";

import { UserEntity } from "../users/user.entity.js";
import { UserModel } from "../users/user.model.js";
import { FriendsEntity } from "./friend.entity.js";
import { FriendFilter } from "./libs/enums/enums.js";

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

		const friendRequest = await this.friendModel
			.query()
			.insert({
				recipientUserId,
				senderUserId,
			})
			.returning("*")
			.execute();

		return FriendsEntity.initialize({
			createdAt: friendRequest.createdAt,
			id: friendRequest.id,
			isFollowing: friendRequest.isFollowing,
			recipientUser: friendRequest.recipientUser ?? null,
			recipientUserId: friendRequest.recipientUserId,
			senderUser: friendRequest.senderUser ?? null,
			senderUserId: friendRequest.senderUserId,
			updatedAt: friendRequest.updatedAt,
		});
	}

	delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public async deleteSubscribe({
		friendRequest,
	}: {
		friendRequest: FriendsEntity;
	}): Promise<boolean> {
		const deletedFriend = await this.friendModel
			.query()
			.deleteById(friendRequest.id as number);

		return deletedFriend ? true : false;
	}

	find(): Promise<null> {
		return Promise.resolve(null);
	}
	findAll(): Promise<FriendsEntity[]> {
		return Promise.resolve([]);
	}

	async getFriendInvitationByRequestId(
		id: number,
	): Promise<FriendsEntity | null> {
		const friendRequest = await this.friendModel
			.query()
			.findById(id)
			.returning("*")
			.execute();

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

	public async getFriendInvitationByUserId(
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

	public async getPotentialFollowers(id: number): Promise<UserEntity[]> {
		const filteredFriends = await this.userModel
			.query()
			.whereNot("users.id", id)
			.withGraphJoined("userDetails")
			.withGraphJoined("recipientUser")
			.whereNotExists(
				UserModel.relatedQuery("recipientUser").where("senderUserId", id),
			);

		return filteredFriends.map((user) =>
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

	public async getUserFollowers(id: number): Promise<UserEntity[]> {
		const userFollowers = await this.friendModel
			.query()
			.modify("getIdWithStatus")
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
			.modify("getIdWithStatus")
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

	public async searchUserByName({
		filter = FriendFilter.UNFOLLOW,
		id,
		value,
	}: {
		filter: string;
		id: number;
		value: string;
	}): Promise<UserEntity[]> {
		let users: UserEntity[] = [];

		switch (filter) {
			case FriendFilter.FOLLOWINGS: {
				users = await this.getUserFollowings(id);
				break;
			}
			case FriendFilter.FOLLOWERS: {
				users = await this.getUserFollowers(id);
				break;
			}
			default: {
				users = await this.getPotentialFollowers(id);
				break;
			}
		}

		return users.filter(
			(user) =>
				user.getFirstName().toLowerCase().includes(value.toLowerCase()) ||
				user.getLastName().toLowerCase().includes(value.toLowerCase()),
		);
	}

	update(): Promise<null> {
		return Promise.resolve(null);
	}
}

export { FriendRepository };
