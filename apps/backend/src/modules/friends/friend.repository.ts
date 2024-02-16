import { type FriendModel } from "~/modules/friends/friend.model.js";

class FriendRepository {
	//implements
	private friendModel: typeof FriendModel;

	public constructor(friendModel: typeof FriendModel) {
		this.friendModel = friendModel;
	}

	// public create(): Promise<any> {
	// 	return Promise.resolve(true);
	// }

	// public delete(): Promise<boolean> {
	// 	return Promise.resolve(true);
	// }

	// public find(): Promise<UserEntity | null> {
	// 	return Promise.resolve(null);
	// }

	// public async findAll(): Promise<unknown[]> {
	// 	//id current user
	// 	const friends = await this.friendModel.query(); //userRepository.findById
	// 	return friends;
	// }

	// public update(): Promise<UserEntity | null> {
	// 	return Promise.resolve(null);
	// }

	public async createFriendshipInvite(
		senderUserId: number,
		recipientUserId: number,
	): Promise<boolean> {
		const existingInvite = await this.getFriendInviteById(
			senderUserId,
			recipientUserId,
		);

		if (existingInvite) {
			return false;
		}

		await this.friendModel.query().insert({
			firstUserId: senderUserId,
			isInvitationAccepted: false,
			secondUserId: recipientUserId,
		});

		return true;
	}

	public async getFriendInviteById(
		senderUserId: number,
		recipientUserId: number,
	): Promise<boolean> {
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

		return friendInvite ? true : false;
	}

	public async respondRequest(
		friendRequestId: number,
		isAccepted: boolean,
	): Promise<boolean> {
		const friendRequest = await this.friendModel
			.query()
			.findById(friendRequestId);

		if (!friendRequest) {
			return false;
		}

		await (isAccepted
			? this.friendModel.query().patchAndFetchById(friendRequestId, {
					isInvitationAccepted: true,
				})
			: this.friendModel.query().deleteById(friendRequestId));

		return true;
	}
}

export { FriendRepository };
