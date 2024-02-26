const FriendsApiPath = {
	$ID: "/:id",
	FOLLOW: "/follow",
	FOLLOWERS: "/followers",
	FOLLOWINGS: "/followings",
	POTENTIAL_FOLLOWINGS: "/potential-followings",
	ROOT: "/",
	UNFOLLOW: "/unfollow",
	UNFOLLOW_BY_$ID: "/unfollow/:id",
	UPDATE: "/update",
} as const;

export { FriendsApiPath };
