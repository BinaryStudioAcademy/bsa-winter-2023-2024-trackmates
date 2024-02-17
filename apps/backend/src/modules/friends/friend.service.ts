import { FriendError, HTTPCode } from "shared";

import { type FriendRepository } from "~/modules/friends/friend.repository.js";

import { FriendErrorMessage } from "./libs/enums/enums.js";
import {
	type FriendAcceptResponseDto,
	type FriendResponseDto,
} from "./libs/types/types.js";

class FriendService {
	private friendRepository: FriendRepository;

	public constructor(friendRepository: FriendRepository) {
		this.friendRepository = friendRepository;
	}

	async getUserFriends(id: number): Promise<FriendResponseDto[]> {
		return await this.friendRepository.getUserFriends(id);
	}

	async respondRequest({
		id,
		isAccepted,
		userId,
	}: {
		id: number;
		isAccepted: boolean;
		userId: number;
	}): Promise<FriendAcceptResponseDto | number> {
		return await this.friendRepository.respondRequest({
			id,
			isAccepted,
			userId,
		});
	}

	async sendFriendRequest(
		id: number,
		receiverUserId: number,
	): Promise<FriendAcceptResponseDto | null> {
		if (id === receiverUserId) {
			throw new FriendError(
				FriendErrorMessage.SEND_REQUEST_TO_YOURSELF,
				HTTPCode.BAD_REQUEST,
			);
		}
		return await this.friendRepository.createFriendshipInvite(
			id,
			receiverUserId,
		);
	}
}

export { FriendService };
