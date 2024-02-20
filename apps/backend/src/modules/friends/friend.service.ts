import { type FriendRepository } from "~/modules/friends/friend.repository.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { FriendsEntity } from "./friend.entity.js";
import {
	FriendError,
	FriendErrorMessage,
	HTTPCode,
} from "./libs/enums/enums.js";
import { type FriendFollowSuccesResponseDto } from "./libs/types/types.js";

class FriendService {
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	async createSubscribe(
		id: number,
		receiverUserId: number,
	): Promise<FriendFollowSuccesResponseDto | null> {
		if (id === receiverUserId) {
			throw new FriendError(
				FriendErrorMessage.SEND_REQUEST_TO_YOURSELF,
				HTTPCode.BAD_REQUEST,
			);
		}

		const subscribeExist =
			await this.friendRepository.getFriendInvitationByUserId(
				id,
				receiverUserId,
			);

		if (subscribeExist) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_EXIST,
				HTTPCode.BAD_REQUEST,
			);
		}

		const friendRequest = await this.friendRepository.create(
			FriendsEntity.initializeNew({
				recipientUser: null,
				recipientUserId: receiverUserId,
				senderUser: null,
				senderUserId: id,
			}),
		);

		return friendRequest.toObject();
	}

	async deleteSubscribe(id: number, userId: number): Promise<boolean> {
		const friendRequest =
			await this.friendRepository.getFriendInvitationByRequestId(id);

		if (!friendRequest || friendRequest.senderUserId !== userId) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return await this.friendRepository.deleteSubscribe({
			friendRequest,
		});
	}

	async getPotentialFollowers(id: number): Promise<UserAuthResponseDto[]> {
		const friends = await this.friendRepository.getPotentialFollowers(id);

		return friends.map((friend) => friend.toObject());
	}

	async getUserFollowers(id: number): Promise<UserAuthResponseDto[]> {
		const friends = await this.friendRepository.getUserFollowers(id);

		return friends.map((friend) => friend.toObject());
	}

	async getUserFollowings(id: number): Promise<UserAuthResponseDto[]> {
		const friends = await this.friendRepository.getUserFollowings(id);

		return friends.map((friend) => friend.toObject());
	}

	public async searchUserByName({
		filter,
		id,
		value,
	}: {
		filter: string;
		id: number;
		value: string;
	}): Promise<UserAuthResponseDto[]> {
		const friends = await this.friendRepository.searchUserByName({
			filter,
			id,
			value,
		});

		return friends.map((friend) => friend.toObject());
	}
}

export { FriendService };
