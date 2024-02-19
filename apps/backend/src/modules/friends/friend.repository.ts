import { type Repository } from "~/libs/types/types.js";
import { type FriendModel } from "~/modules/friends/friend.model.js";

import { UserEntity } from "../users/user.entity.js";
import { UserModel } from "../users/user.model.js";
import { FriendEntity } from "./friend.entity.js";

class FriendRepository implements Repository<FriendEntity> {
	private friendModel: typeof FriendModel;
	private userModel: typeof UserModel;

	public constructor(
		friendModel: typeof FriendModel,
		userModel: typeof UserModel,
	) {
		this.friendModel = friendModel;
		this.userModel = userModel;
	}

	public async create(entity: FriendEntity): Promise<FriendEntity> {
		const { recipientUserId, senderUserId } = entity.toNewObject();

		const friendRequest = await this.friendModel
			.query()
			.insert({
				recipientUserId,
				senderUserId,
			})
			.returning("*")
			.execute();

		return FriendEntity.initialize({
			createdAt: friendRequest.createdAt,
			id: friendRequest.id,
			isInvitationAccepted: friendRequest.isInvitationAccepted,
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
	find(): Promise<null> {
		return Promise.resolve(null);
	}
	findAll(): Promise<FriendEntity[]> {
		return Promise.resolve([]);
	}

	async getFriendInvitationByRequestId(
		id: number,
	): Promise<FriendEntity | null> {
		const friendRequest = await this.friendModel
			.query()
			.findById(id)
			.returning("*")
			.execute();

		return friendRequest
			? FriendEntity.initialize({
					createdAt: friendRequest.createdAt,
					id: friendRequest.id,
					isInvitationAccepted: friendRequest.isInvitationAccepted,
					recipientUser: friendRequest.recipientUser ?? null,
					recipientUserId: friendRequest.recipientUserId,
					senderUser: friendRequest.senderUser ?? null,
					senderUserId: friendRequest.senderUserId,
					updatedAt: friendRequest.updatedAt,
				})
			: null;
	}

	public async getFriendInvitationByUserId(
		recipientUserId: number,
		senderUserId: number,
	): Promise<FriendEntity | null> {
		const friendRequest = await this.friendModel
			.query()
			.where({
				recipientUserId: recipientUserId,
				senderUserId: senderUserId,
			})
			.orWhere({
				recipientUserId: senderUserId,
				senderUserId: recipientUserId,
			})
			.first();

		return friendRequest
			? FriendEntity.initialize({
					createdAt: friendRequest.createdAt,
					id: friendRequest.id,
					isInvitationAccepted: friendRequest.isInvitationAccepted,
					recipientUser: friendRequest.recipientUser ?? null,
					recipientUserId: friendRequest.recipientUserId,
					senderUser: friendRequest.senderUser ?? null,
					senderUserId: friendRequest.senderUserId,
					updatedAt: friendRequest.updatedAt,
				})
			: null;
	}

	public async getPotentialFriends(id: number): Promise<UserEntity[]> {
		const friendsForSenderUser = await this.userModel
			.query()
			.withGraphFetched("userDetails")
			.withGraphFetched("senderUser")
			.withGraphFetched("recipientUser");

		const filteredFriends = friendsForSenderUser.filter((user) => {
			const hasUserSender = user.senderUser.some(
				(sender) => sender.senderUserId === id,
			);
			const hasUserRecipient = user.senderUser.some(
				(sender) => sender.recipientUserId === id,
			);
			const cheakUserRecipientInSenderUser = user.recipientUser.some(
				(recipient) => recipient.recipientUserId === id,
			);
			const cheakUserRecipientInRecipientUser = user.recipientUser.some(
				(recipient) => recipient.senderUserId === id,
			);

			return (
				!hasUserSender &&
				!cheakUserRecipientInSenderUser &&
				!hasUserRecipient &&
				!cheakUserRecipientInRecipientUser
			);
		});

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

	public async getUserFriends(id: number): Promise<FriendEntity[]> {
		const friendsForSenderUser = await this.friendModel
			.query()
			.modify("getIdWithStatus")
			.where("senderUserId", id)
			.where("isInvitationAccepted", true)
			.withGraphFetched("recipientUser(onlyId)")
			.withGraphFetched("recipientUser.userDetails(selectFirstNameLastName)");

		const friendsForRecipientUser = await this.friendModel
			.query()
			.modify("getIdWithStatus")
			.where("recipientUserId", id)
			.withGraphFetched("senderUser(onlyId)")
			.withGraphFetched("senderUser.userDetails(selectFirstNameLastName)");

		const allFriend = [...friendsForSenderUser, ...friendsForRecipientUser];
		return allFriend.map((allFriend) =>
			FriendEntity.initialize({
				createdAt: allFriend.createdAt,
				id: allFriend.id,
				isInvitationAccepted: allFriend.isInvitationAccepted,
				recipientUser: allFriend.recipientUser ?? null,
				recipientUserId: allFriend.recipientUserId,
				senderUser: allFriend.senderUser ?? null,
				senderUserId: allFriend.senderUserId,
				updatedAt: allFriend.updatedAt,
			}),
		);
	}

	public async respondToFriendRequest({
		friendRequest,
		isAccepted,
	}: {
		friendRequest: FriendEntity;
		isAccepted: boolean;
	}): Promise<FriendEntity | null> {
		const friendRequestForUpdate = await this.friendModel
			.query()
			.patchAndFetchById(friendRequest.id as number, {
				isInvitationAccepted: isAccepted,
			});

		if (!isAccepted) {
			await this.friendModel.query().deleteById(friendRequest.id as number);
		}

		return FriendEntity.initialize({
			createdAt: friendRequestForUpdate.createdAt,
			id: friendRequestForUpdate.id,
			isInvitationAccepted: friendRequestForUpdate.isInvitationAccepted,
			recipientUser: null,
			recipientUserId: friendRequestForUpdate.recipientUserId,
			senderUser: null,
			senderUserId: friendRequestForUpdate.senderUserId,
			updatedAt: friendRequestForUpdate.updatedAt,
		});
	}

	public async searchFriendsByName(value: string): Promise<UserEntity[]> {
		let query = this.userModel.query().withGraphJoined("userDetails");

		if (value) {
			query = query
				.whereRaw("LOWER(user_details.first_name) LIKE ?", [
					`%${value.toLowerCase()}%`,
				])
				.orWhereRaw("LOWER(user_details.last_name) LIKE ?", [
					`%${value.toLowerCase()}%`,
				])
				.distinct();
		}

		const users = await query.execute();

		return users.map((user) =>
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

	update(): Promise<null> {
		return Promise.resolve(null);
	}
}

export { FriendRepository };
