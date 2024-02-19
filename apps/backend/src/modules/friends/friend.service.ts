import { UserAuthResponseDto } from "shared";

import { type FriendRepository } from "~/modules/friends/friend.repository.js";

import { FriendEntity } from "./friend.entity.js";
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

	async createFriendRequest(
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

		const friendRequest = await this.friendRepository.create(
			FriendEntity.initializeNew({
				recipientUser: null,
				recipientUserId: receiverUserId,
				senderUser: null,
				senderUserId: id,
			}),
		);

		return friendRequest.toObject();
	}

	async getPotentialFriends(id: number): Promise<UserAuthResponseDto[]> {
		const friends = await this.friendRepository.getPotentialFriends(id);

		return friends.map((friend) => friend.toObject());
	}

	async getUserFriends(id: number): Promise<FriendResponseDto[]> {
		const friends = await this.friendRepository.getUserFriends(id);

		return friends.map((friend) => friend.toObject());
	}

	async respondToFriendRequestt({
		id,
		isAccepted,
		userId,
	}: {
		id: number;
		isAccepted: boolean;
		userId: number;
	}): Promise<FriendAcceptResponseDto | null> {
		const friendRequest =
			await this.friendRepository.getFriendInvitationByRequestId(id);

		if (!friendRequest || friendRequest.recipientUserId !== userId) {
			throw new FriendError(
				FriendErrorMessage.FRIEND_REQUEST_ERROR,
				HTTPCode.BAD_REQUEST,
			);
		}

		const updatedFriendRequest =
			await this.friendRepository.respondToFriendRequest({
				friendRequest,
				isAccepted,
			});

		return updatedFriendRequest?.toObject() ?? null;
	}

	public async searchFriendsByName(
		value: string,
	): Promise<UserAuthResponseDto[]> {
		const friends = await this.friendRepository.searchFriendsByName(value);

		return friends.map((friend) => friend.toObject());
	}
}

export { FriendService };
