import { ExceptionMessage, FriendError, HTTPCode } from "shared";

import { type FriendModel } from "~/modules/friends/friend.model.js";

import { type FriendAddNewResponsetDto } from "./friend.js";

class FriendRepository {
	private friendModel: typeof FriendModel;

	public constructor(friendModel: typeof FriendModel) {
		this.friendModel = friendModel;
	}

	public async createFriendshipInvite(
		senderUserId: number,
		recipientUserId: number,
	): Promise<FriendAddNewResponsetDto | null> {
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

	public async respondRequest(
		friendRequestId: number,
		isAccepted: boolean,
	): Promise<FriendAddNewResponsetDto | null> {
		const friendRequest = await this.friendModel
			.query()
			.findById(friendRequestId);

		if (!friendRequest) {
			throw new FriendError(
				ExceptionMessage.UNKNOWN_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		if (isAccepted) {
			return await this.friendModel.query().patchAndFetchById(friendRequestId, {
				isInvitationAccepted: true,
			});
		} else {
			await this.friendModel.query().deleteById(friendRequestId);

			return null;
		}
	}
}

export { FriendRepository };
