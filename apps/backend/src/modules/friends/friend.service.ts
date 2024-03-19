import { convertPageToZeroIndexed } from "~/libs/helpers/helpers.js";
import { type PaginationResponseDto } from "~/libs/types/types.js";
import { type FriendRepository } from "~/modules/friends/friend.repository.js";
import {
	type NotificationService,
	NotificationType,
} from "~/modules/notifications/notifications.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	FriendError,
	FriendErrorMessage,
	HTTPCode,
} from "./libs/enums/enums.js";

class FriendService {
	private friendRepository: FriendRepository;
	private notificationService: NotificationService;

	public constructor(
		friendRepository: FriendRepository,
		notificationService: NotificationService,
	) {
		this.friendRepository = friendRepository;
		this.notificationService = notificationService;
	}

	public async createSubscription(
		followerUserId: number,
		followingUserId: number,
	): Promise<UserAuthResponseDto | null> {
		if (followerUserId === followingUserId) {
			throw new FriendError({
				message: FriendErrorMessage.FRIEND_SEND_REQUEST_TO_YOURSELF,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const isSubscriptionExist =
			await this.friendRepository.getIsSubscribedByRequestId(
				followerUserId,
				followingUserId,
			);

		if (isSubscriptionExist) {
			throw new FriendError({
				message: FriendErrorMessage.FRIEND_IS_ALREADY_FOLLOWING,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const followingUser = await this.friendRepository.create({
			followerUserId,
			followingUserId,
		});

		await this.notificationService.create({
			actionId: null,
			receiverUserId: followingUserId,
			type: NotificationType.NEW_FOLLOWER,
			userId: followerUserId,
		});

		return followingUser.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.friendRepository.delete(id);

		if (!isDeleted) {
			throw new FriendError({
				message: FriendErrorMessage.FRIEND_DELETE_ERROR,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return isDeleted;
	}

	public async deleteSubscription(
		id: number,
		userId: number,
	): Promise<boolean> {
		const isFollowingNow =
			await this.friendRepository.getIsSubscribedByRequestId(id, userId);

		if (!isFollowingNow) {
			throw new FriendError({
				message: FriendErrorMessage.FRIEND_REQUEST_ERROR,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const isDeleted = await this.friendRepository.deleteSubscription(
			id,
			userId,
		);

		if (!isDeleted) {
			throw new FriendError({
				message: FriendErrorMessage.FRIEND_DELETE_ERROR,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		await this.notificationService.deleteAllNotificationsByUserId(
			id,
			userId,
			NotificationType.NEW_FOLLOWER,
		);

		return isDeleted;
	}

	public async find(id: number): Promise<UserAuthResponseDto | null> {
		const foundUser = await this.friendRepository.find(id);

		if (!foundUser) {
			throw new FriendError({
				message: FriendErrorMessage.FRIEND_SEARCH_ERROR,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return foundUser.toObject();
	}

	public async findAll(): Promise<UserAuthResponseDto[]> {
		const foundUsers = await this.friendRepository.findAll();

		return foundUsers.map((user) => user.toObject());
	}

	public async getIsFollowing(
		currentUserId: number,
		otherUserId: number,
	): Promise<boolean> {
		return await this.friendRepository.getIsFollowing(
			currentUserId,
			otherUserId,
		);
	}

	public async getPotentialFollowers({
		count,
		id,
		page,
	}: {
		count: number;
		id: number;
		page: number;
	}): Promise<PaginationResponseDto<UserAuthResponseDto>> {
		const { items, total } = await this.friendRepository.getPotentialFollowers({
			count,
			id,
			page: convertPageToZeroIndexed(page),
		});

		return {
			items: items.map((user) => user.toObject()),
			total,
		};
	}

	public async getUserFollowers({
		count,
		id,
		page,
	}: {
		count: number;
		id: number;
		page: number;
	}): Promise<PaginationResponseDto<UserAuthResponseDto>> {
		const { items, total } = await this.friendRepository.getUserFollowers({
			count,
			id,
			page: convertPageToZeroIndexed(page),
		});

		return {
			items: items.map((user) => user.toObject()),
			total,
		};
	}

	public async getUserFollowings({
		count,
		id,
		page,
	}: {
		count: number;
		id: number;
		page: number;
	}): Promise<PaginationResponseDto<UserAuthResponseDto>> {
		const { items, total } = await this.friendRepository.getUserFollowings({
			count,
			id,
			page: convertPageToZeroIndexed(page),
		});

		return {
			items: items.map((user) => user.toObject()),
			total,
		};
	}

	public async getUserFollowingsIds(id: number): Promise<number[]> {
		return await this.friendRepository.getUserFollowingsIds(id);
	}

	public async update(id: number): Promise<UserAuthResponseDto> {
		const updatedUser = await this.friendRepository.update(id);

		return updatedUser.toObject();
	}
}

export { FriendService };
