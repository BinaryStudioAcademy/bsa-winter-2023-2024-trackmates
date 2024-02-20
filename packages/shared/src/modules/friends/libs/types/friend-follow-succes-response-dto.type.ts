type FriendFollowSuccesResponseDto = {
	createdAt: string;
	id: number;
	isFollowing: boolean | null;
	recipientUserId: number;
	senderUserId: number;
	updatedAt: string;
};

export { type FriendFollowSuccesResponseDto };
