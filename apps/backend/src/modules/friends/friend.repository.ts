import { type FriendModel } from "~/modules/friends/friend.model.js";

import { type FriendAcceptResponseDto } from "./libs/types/types.js";

class FriendRepository {
	private friendModel: typeof FriendModel;

	public constructor(friendModel: typeof FriendModel) {
		this.friendModel = friendModel;
	}

	public async createFriendInvite(
		recipientUserId: number,
		senderUserId: number,
	): Promise<FriendAcceptResponseDto | null> {
		const existingInvite = await this.getFriendInviteById(
			recipientUserId,
			senderUserId,
		);

		if (existingInvite) {
			return null;
		}

		return await this.friendModel.query().insert({
			isInvitationAccepted: false,
			recipientUserId: recipientUserId,
			senderUserId: senderUserId,
		});
	}

	public async getFriendInviteById(
		recipientUserId: number,
		senderUserId: number,
	): Promise<FriendModel | null> {
		const friendInvite = await this.friendModel
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

		return friendInvite ?? null;
	}

	public async getUserFriends(id: number): Promise<FriendModel[]> {
		const friendsForSenderUser = await this.friendModel
			.query()
			.where("senderUserId", id)
			.withGraphFetched("recipientUser(onlyId)")
			.withGraphFetched("recipientUser.userDetails");

		const friendsForRecipientUser = await this.friendModel
			.query()
			.where("recipientUserId", id)
			.withGraphFetched("senderUser(onlyId)")
			.withGraphFetched("senderUser.userDetails");

		return [...friendsForSenderUser, ...friendsForRecipientUser];
	}

	async respondToRequest({
		id,
		isAccepted,
		userId,
	}: {
		id: number;
		isAccepted: boolean;
		userId: number;
	}): Promise<FriendAcceptResponseDto | null> {
		const friendRequest = await this.friendModel.query().findById(id);

		if (!friendRequest || friendRequest.recipientUserId !== userId) {
			return null;
		}

		if (isAccepted) {
			return await this.friendModel.query().patchAndFetchById(id, {
				isInvitationAccepted: true,
			});
		} else {
			await this.friendModel.query().deleteById(id);
			return friendRequest;
		}
	}
}

export { FriendRepository };
