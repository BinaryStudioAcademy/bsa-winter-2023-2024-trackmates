import { type FriendModel } from "~/modules/friends/friend.model.js";

import { type FriendAcceptResponseDto } from "./libs/types/types.js";

class FriendRepository {
	private friendModel: typeof FriendModel;

	public constructor(friendModel: typeof FriendModel) {
		this.friendModel = friendModel;
	}

	public async createFriendInvite(
		id: number,
		recipientUserId: number,
	): Promise<FriendAcceptResponseDto | null> {
		return await this.friendModel.query().insert({
			isInvitationAccepted: false,
			recipientUserId: recipientUserId,
			senderUserId: id,
		});
	}

	async getFriendInvitationByRequestId(
		id: number,
	): Promise<FriendAcceptResponseDto | null> {
		const friendRequest = await this.friendModel.query().findById(id);

		return friendRequest ?? null;
	}

	public async getFriendInvitationByUserId(
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
		friendRequest,
		isAccepted,
	}: {
		friendRequest: FriendAcceptResponseDto;
		isAccepted: boolean;
	}): Promise<FriendAcceptResponseDto> {
		if (isAccepted) {
			return await this.friendModel
				.query()
				.patchAndFetchById(friendRequest.id, {
					isInvitationAccepted: true,
				});
		} else {
			await this.friendModel.query().deleteById(friendRequest.id);
			return friendRequest;
		}
	}
}

export { FriendRepository };
