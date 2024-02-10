const AuthPluginErrorMessage = {
	NO_AUTH_HEADER: "Authorization header is required",
	NO_JWT: "JWT is required",
	NO_USER: "User not found",
	INVALID_JWT: "JWT is invalid",
} as const;

export { AuthPluginErrorMessage };
