const FriendErrorMessage = {
	FRIEND_REQUEST_ERROR: "You are not subscribed to this user",
	FRIEND_REQUEST_EXIST: "You already follow this user",
	FRIEND_UNFOLLOW_ERROR: "You are not following this user",
	FRIEND_UPDATE_ERROR: "Friend update error: Unable to update the subscription",
	SEND_REQUEST_TO_YOURSELF: "You follow yourself",
} as const;

export { FriendErrorMessage };
