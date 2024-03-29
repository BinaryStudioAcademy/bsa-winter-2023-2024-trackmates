const AppRoute = {
	ANY: "*",
	CHATS: "/chats",
	CHATS_$ID: "/chats/:id",
	FEED: "/feed",
	FORGOT_PASSWORD: "/forgot-password",
	FRIENDS: "/friends",
	FRIENDS_FOLLOWERS: "/friends/followers",
	FRIENDS_FOLLOWINGS: "/friends/followings",
	MANAGEMENT: "/management",
	MANAGEMENT_COURSES: "/management/courses",
	MANAGEMENT_GROUPS: "/management/groups",
	MANAGEMENT_USERS: "/management/users",
	NOTIFICATIONS: "/notifications",
	PROFILE: "/profile",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	SUBSCRIPTION: "/subscription",
	SUBSCRIPTION_CHECKOUT: "/subscription/checkout",
	UPDATE_PASSWORD: "/update-password",
	USERS_$ID: "/users/:id",
	USERS_$USER_ID_COURSES_$COURSE_ID: "/users/:userId/courses/:courseId",
	USERS_$USER_ID_COURSES_$COURSE_ID_COMPARE:
		"/users/:userId/courses/:courseId/compare",
} as const;

export { AppRoute };
