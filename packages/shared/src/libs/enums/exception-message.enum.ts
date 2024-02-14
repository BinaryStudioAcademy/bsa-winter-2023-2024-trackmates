const ExceptionMessage = {
	EMAIL_ALREADY_EXISTS: "Email is already taken.",
	INCORRECT_CREDENTIALS: "Incorrect credentials.",
	INVALID_TOKEN: "Token is invalid.",
	UNKNOWN_ERROR: "Unknown error occurred.",
	USER_NOT_FOUND: "User not found.",
	USER_WITH_EMAIL_NOT_FOUND: "User with this email not found.",
	USERNAME_ALREADY_EXISTS: "Username is already taken.",
} as const;

export { ExceptionMessage };
