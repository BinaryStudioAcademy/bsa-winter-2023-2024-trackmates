import { type FriendRepository } from "~/modules/friends/friend.repository.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	FriendError,
	FriendErrorMessage,
	HTTPCode,
} from "./libs/enums/enums.js";

class FriendService {
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	async createSubscribe(
		followerUserId: number,
		followingUserId: number,
	): Promise<UserAuthResponseDto | null> {
		if (followerUserId === followingUserId) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_SEND_REQUEST_TO_YOURSELF,
				HTTPCode.BAD_REQUEST,
			);
		}

		const isSubscribeExist =
			await this.friendRepository.getSubscriptionByRequestId(
				followerUserId,
				followingUserId,
			);

		if (!isSubscribeExist) {
			const followingUser = await this.friendRepository.create({
				followerUserId,
				followingUserId,
			});

			return followingUser?.toObject() ?? null;
		}

		throw new FriendError(
			FriendErrorMessage.FRIEND_IS_ALREADY_TRACKING,
			HTTPCode.BAD_REQUEST,
		);
	}

	async find(id: number): Promise<UserAuthResponseDto | null> {
		const foundUser = await this.friendRepository.find(id);

		if (!foundUser) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_SEARCH_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return foundUser.toObject();
	}

	async findAll(id: number): Promise<UserAuthResponseDto[]> {
		const foundUsers = await this.friendRepository.findAll(id);

		return foundUsers.map((user) => user.toObject());
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

	async unfollow(id: number, userId: number): Promise<boolean> {
		const isFollowingNow =
			await this.friendRepository.getSubscriptionByRequestId(id, userId);

		if (!isFollowingNow) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		const isDeletedSuccess = await this.friendRepository.delete(id, userId);

		if (!isDeletedSuccess) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_UPDATE_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return isDeletedSuccess;
	}

	async update(id: number): Promise<UserAuthResponseDto> {
		const updatedUser = await this.friendRepository.update(id);

		return updatedUser.toObject();
	}
}

export { FriendService };
