const AppRoute = {
	ANY: "*",
	FRIENDS: "/friends",
	FRIENDS_FOLLOWERS: "/friends/followers",
	FRIENDS_FOLLOWINGS: "/friends/followings",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
