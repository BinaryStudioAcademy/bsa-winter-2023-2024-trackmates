const AppRoute = {
	ANY: "*",
	FEED: "/feed",
	FRIENDS: "/friends",
	FRIENDS_FOLLOWERS: "/friends/followers",
	FRIENDS_FOLLOWINGS: "/friends/followings",
	PROFILE: "/profile",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
