import { ExceptionMessage, FriendError, HTTPCode } from "shared";

import { type FriendRepository } from "~/modules/friends/friend.repository.js";
import { UserEntity } from "~/modules/users/user.entity.js";

class FriendService {
	//implements Service
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	// public async create(): Promise<unknown> {
	// 	return Promise.resolve(null);
	// }

	// public delete(): Promise<boolean> {
	// 	return Promise.resolve(true);
	// }

	// public find(): Promise<UserEntity | null> {
	// 	return Promise.resolve(null);
	// }

	// public async findAll(): Promise<{ items: unknown[] }> {
	// 	const friend = await this.friendRepository.findAll();
	// 	return { items: friend };
	// }

	async respondRequest(
		friendRequestId: number,
		isAccepted: boolean,
	): Promise<boolean> {
		const responseSuccess = await this.friendRepository.respondRequest(
			friendRequestId,
			isAccepted,
		);

		if (!responseSuccess) {
			throw new FriendError(
				ExceptionMessage.UNKNOWN_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return responseSuccess;
	}

	async sendFriendRequest(
		senderUserId: number,
		recipientUserId: number,
	): Promise<boolean> {
		return await this.friendRepository.createFriendshipInvite(
			senderUserId,
			recipientUserId,
		);
	}
	public update(): Promise<UserEntity | null> {
		return Promise.resolve(null);
	}
}

export { FriendService };
