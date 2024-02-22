const FriendsApiPath = {
	FOLLOW: "/follow",
	FOLLOWERS: "/followers",
	FOLLOWINGS: "/followings",
	ID: "/:id",
	POTENTIAL_FOLLOWINGS: "/potential-followings",
	ROOT: "/",
	UNFOLLOW: "/unfollow",
	UPDATE: "/update",
} as const;

export { FriendsApiPath };
