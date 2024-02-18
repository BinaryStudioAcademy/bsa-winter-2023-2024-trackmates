import { type FriendRepository } from "~/modules/friends/friend.repository.js";

import { UserModel } from "../users/user.model.js";
import {
	FriendError,
	FriendErrorMessage,
	HTTPCode,
} from "./libs/enums/enums.js";
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

	async respondToRequest({
		id,
		isAccepted,
		userId,
	}: {
		id: number;
		isAccepted: boolean;
		userId: number;
	}): Promise<FriendAcceptResponseDto | number> {
		const friendRequest =
			await this.friendRepository.getFriendInvitationByRequestId(id);

		if (!friendRequest || friendRequest.recipientUserId !== userId) {
			// if you try delete not your request you will get error too
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		return await this.friendRepository.respondToRequest({
			friendRequest,
			isAccepted,
		});
	}

	public async searchFriendsByName(
		limit: number,
		page: number,
		value: string,
	): Promise<UserModel[]> {
		return await this.friendRepository.searchFriendsByName(limit, page, value);
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

		const existingInvite =
			await this.friendRepository.getFriendInvitationByUserId(
				id,
				receiverUserId,
			);

		if (existingInvite) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_EXIST,
				HTTPCode.BAD_REQUEST,
			);
		}

		return await this.friendRepository.createFriendInvite(id, receiverUserId);
	}
}

export { FriendService };
