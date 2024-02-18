import { type FriendModel } from "~/modules/friends/friend.model.js";

import { UserModel } from "../users/user.model.js";
import { type FriendAcceptResponseDto } from "./libs/types/types.js";

class FriendRepository {
	private friendModel: typeof FriendModel;
	private userModel: typeof UserModel;

	public constructor(
		friendModel: typeof FriendModel,
		userModel: typeof UserModel,
	) {
		this.friendModel = friendModel;
		this.userModel = userModel;
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
			.modify("getIdWithStatus")
			.where("senderUserId", id)
			.withGraphFetched("recipientUser(onlyId)")
			.withGraphFetched("recipientUser.userDetails(selectFirstNameLastName)");

		const friendsForRecipientUser = await this.friendModel
			.query()
			.modify("getIdWithStatus")
			.where("recipientUserId", id)
			.withGraphFetched("senderUser(onlyId)")
			.withGraphFetched("senderUser.userDetails(selectFirstNameLastName)");

		return [...friendsForSenderUser, ...friendsForRecipientUser];
	}

	async respondToRequest({
		friendRequest,
		isAccepted,
	}: {
		friendRequest: FriendAcceptResponseDto;
		isAccepted: boolean;
	}): Promise<FriendAcceptResponseDto> {
		return await this.friendModel.query().patchAndFetchById(friendRequest.id, {
			isInvitationAccepted: isAccepted ? true : false,
		});
	}

	public async searchFriendsByName(
		limit: number,
		page: number,
		value: string,
	): Promise<UserModel[]> {
		let query = this.userModel
			.query()
			.withGraphJoined("userDetails(selectFirstNameLastName)")
			.withGraphJoined("senderUser(getIdWithStatus)")
			.withGraphJoined("recipientUser(getIdWithStatus)")
			.select("users.id as id", "userDetails", "senderUser", "recipientUser");

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

		return await query.offset(page).limit(limit).execute();
	}
}

export { FriendRepository };
