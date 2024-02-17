const AppRoute = {
	ANY: "*",
	PROFILE: "/profile/:userId",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
