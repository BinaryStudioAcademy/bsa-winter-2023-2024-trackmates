const AppRoute = {
	ANY: "*",
	CHATS: "/chats",
	CHATS_$ID: "/chats/:id",
	FRIENDS: "/friends",
	FRIENDS_FOLLOWERS: "/friends/followers",
	FRIENDS_FOLLOWINGS: "/friends/followings",
	PROFILE: "/profile",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	USERS_$ID: "/users/:id",
} as const;

export { AppRoute };
