const FriendsApiPath = {
	$ID: "/:id",
	$ID_IS_FOLLOWING: "/:id/is-following",
	FOLLOW: "/follow",
	FOLLOWERS: "/followers",
	FOLLOWINGS: "/followings",
	FOLLOWINGS_IDS: "/followings/ids",
	POTENTIAL_FOLLOWINGS: "/potential-followings",
	ROOT: "/",
	UNFOLLOW: "/unfollow",
	UNFOLLOW_BY_$ID: "/unfollow/:id",
	UPDATE: "/update",
} as const;

export { FriendsApiPath };
