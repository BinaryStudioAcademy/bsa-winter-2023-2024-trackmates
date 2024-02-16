import { ExceptionMessage, FriendError, HTTPCode } from "shared";

import { type FriendRepository } from "~/modules/friends/friend.repository.js";

import {
	type FriendAddNewResponsetDto,
	type FriendGetAllFriendeDto,
} from "./libs/types/types.js";

class FriendService {
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	async getUserFriends(id: number): Promise<FriendGetAllFriendeDto[]> {
		return await this.friendRepository.getUserFriends(id);
	}

	async respondRequest(
		friendRequestId: number,
		isAccepted: boolean,
	): Promise<FriendAddNewResponsetDto | null> {
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
		id: number,
		receiverUserId: number,
	): Promise<FriendAddNewResponsetDto | null> {
		if (id === receiverUserId) {
			throw new FriendError(
				ExceptionMessage.UNKNOWN_ERROR, // cant send req to yourself
				HTTPCode.BAD_REQUEST, // cant send req to yourself
			);
		}
		return await this.friendRepository.createFriendshipInvite(
			id,
			receiverUserId,
		);
	}
}

export { FriendService };
