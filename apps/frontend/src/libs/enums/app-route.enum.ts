const AppRoute = {
	ANY: "*",
	FOLLOWERS: "/friends/followers",
	FOLLOWINGS: "/friends/followings",
	FRIENDS: "/friends",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
