import { type FriendRepository } from "~/modules/friends/friend.repository.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { FriendsEntity } from "./friend.entity.js";
import {
	FriendError,
	FriendErrorMessage,
	HTTPCode,
} from "./libs/enums/enums.js";
import { type FriendFollowResponseDto } from "./libs/types/types.js";

class FriendService {
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	async createSubscribe(
		id: number,
		receiverUserId: number,
	): Promise<FriendFollowResponseDto | null> {
		if (id === receiverUserId) {
			throw new FriendError(
				FriendErrorMessage.SEND_REQUEST_TO_YOURSELF,
				HTTPCode.BAD_REQUEST,
			);
		}

		const subscribeExist = await this.friendRepository.getSubscribeByUserId(
			id,
			receiverUserId,
		);

		if (!subscribeExist) {
			const subscription = await this.friendRepository.create(
				FriendsEntity.initializeNew({
					recipientUser: null,
					recipientUserId: receiverUserId,
					senderUser: null,
					senderUserId: id,
				}),
			);
			return subscription.toObject();
		}

		if (!subscribeExist.isFollowing) {
			const updatedSubscription = await this.friendRepository.updateSubscribe({
				subscription: subscribeExist,
			});
			return updatedSubscription.toObject();
		}

		throw new FriendError(
			FriendErrorMessage.FRIEND_REQUEST_EXIST,
			HTTPCode.BAD_REQUEST,
		);
	}

	async getPotentialFollowers(id: number): Promise<UserAuthResponseDto[]> {
		const followers = await this.friendRepository.getPotentialFollowers(id);

		return followers.map((user) => user.toObject());
	}

	async getUserFollowers(id: number): Promise<UserAuthResponseDto[]> {
		const followers = await this.friendRepository.getUserFollowers(id);

		return followers.map((user) => user.toObject());
	}

	async getUserFollowings(id: number): Promise<UserAuthResponseDto[]> {
		const folowings = await this.friendRepository.getUserFollowings(id);

		return folowings.map((user) => user.toObject());
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
		const users = await this.friendRepository.searchUserByName({
			filter,
			id,
			value,
		});

		return users.map((user) => user.toObject());
	}

	async unsubscribe(
		id: number,
		userId: number,
	): Promise<FriendFollowResponseDto> {
		const subscription = await this.friendRepository.getSubscribeByRequestId(
			id,
			userId,
		);
		if (!subscription || subscription.senderUserId !== userId) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		if (!subscription.isFollowing) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		const updatedSubscription = await this.friendRepository.updateSubscribe({
			subscription,
		});

		return updatedSubscription.toObject();
	}
}

export { FriendService };
