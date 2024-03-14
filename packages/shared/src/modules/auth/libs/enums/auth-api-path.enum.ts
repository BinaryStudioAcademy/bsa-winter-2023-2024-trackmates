const AuthApiPath = {
	AUTHENTICATED_USER: "/authenticated-user",
	ROOT: "/",
	SEND_UPDATE_PASSWORD_LINK: "/send-update-password-link",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UPDATE_PASSWORD: "/update-password",
} as const;

export { AuthApiPath };
