import { FriendError, HTTPCode } from "shared";

import { type FriendModel } from "~/modules/friends/friend.model.js";

import { type FriendAcceptResponseDto } from "./libs/types/types.js";
import { FriendErrorMessage } from "./libs/enums/enums.js";

class FriendRepository {
	private friendModel: typeof FriendModel;

	public constructor(friendModel: typeof FriendModel) {
		this.friendModel = friendModel;
	}

	public async createFriendshipInvite(
		senderUserId: number,
		recipientUserId: number,
	): Promise<FriendAcceptResponseDto | null> {
		const existingInvite = await this.getFriendInviteById(
			senderUserId,
			recipientUserId,
		);

		if (existingInvite) {
			return null;
		}

		return await this.friendModel.query().insert({
			firstUserId: senderUserId,
			isInvitationAccepted: false,
			secondUserId: recipientUserId,
		});
	}

	public async getFriendInviteById(
		senderUserId: number,
		recipientUserId: number,
	): Promise<FriendModel | null> {
		const friendInvite = await this.friendModel
			.query()
			.where({
				firstUserId: senderUserId,
				secondUserId: recipientUserId,
			})
			.orWhere({
				firstUserId: recipientUserId,
				secondUserId: senderUserId,
			})
			.first();

		return friendInvite || null;
	}

	public async getUserFriends(id: number): Promise<FriendModel[]> {
		const friendsForFirstUser = await this.friendModel
			.query()
			.where("firstUserId", id)
			.withGraphFetched("secondUser(onlyId)")
			.withGraphFetched("secondUser.userDetails");

		const friendsForSecondUser = await this.friendModel
			.query()
			.where("secondUserId", id)
			.withGraphFetched("firstUser(onlyId)")
			.withGraphFetched("firstUser.userDetails");

		return [...friendsForFirstUser, ...friendsForSecondUser];
	}

	async respondRequest({
		id,
		userId,
		isAccepted,
	}: {
		id: number;
		userId: number;
		isAccepted: boolean;
	}): Promise<FriendAcceptResponseDto | number> {
		const friendRequest = await this.friendModel
			.query()
			.findById(id);

		if (!friendRequest || friendRequest.secondUserId !== userId) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		if (isAccepted) {
			return await this.friendModel.query().patchAndFetchById(id, {
				isInvitationAccepted: true,
			});
		} else {
			await this.friendModel.query().deleteById(id);
			return friendRequest.id;
		}
	}
}

export { FriendRepository };
