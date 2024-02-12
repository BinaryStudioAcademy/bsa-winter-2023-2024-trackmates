const ExceptionMessage = {
	INVALID_JWT: "JWT is invalid",
	NO_AUTH_HEADER: "Authorization header is required",
	NO_JWT: "JWT is required",
	NO_USER: "User not found",
	UNKNOWN_ERROR: "Unknown error occurred.",
} as const;

export { ExceptionMessage };
