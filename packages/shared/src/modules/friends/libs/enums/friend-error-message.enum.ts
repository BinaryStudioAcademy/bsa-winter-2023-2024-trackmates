const FriendErrorMessage = {
	FRIEND_IS_ALREADY_TRACKING: "You already follow this user.",
	FRIEND_REQUEST_ERROR: "You are not subscribed to this user.",
	FRIEND_SEARCH_ERROR: "This user does not exist.",
	FRIEND_SEND_REQUEST_TO_YOURSELF: "You follow yourself.",
	FRIEND_UNFOLLOW_ERROR: "You are not following this user.",
	FRIEND_UPDATE_ERROR:
		"Friend update error: Unable to update the subscription.",
} as const;

export { FriendErrorMessage };
