const AppRoute = {
	ANY: "*",
	CHATS: "/chats",
	CHATS_$ID: "/chats/:id",
	FEED: "/feed",
	FRIENDS: "/friends",
	FRIENDS_FOLLOWERS: "/friends/followers",
	FRIENDS_FOLLOWINGS: "/friends/followings",
	NOTIFICATIONS: "/notifications",
	PROFILE: "/profile",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	USERS_$ID: "/users/:id",
	USERS_$USER_ID_COURSES_$COURSE_ID: "/users/:userId/courses/:courseId",
	USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE:
		"/users/:userId/courses/:courseId/compare",
} as const;

export { AppRoute };
