type FriendAddNewResponseDto = {
	createdAt: string;
	id: number;
	isInvitationAccepted: boolean | null;
	recipientUserId: number;
	senderUserId: number;
	updatedAt: string;
};

export { type FriendAddNewResponseDto };
