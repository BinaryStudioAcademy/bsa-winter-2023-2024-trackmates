const ErrorMessage = {
	EMAIL_ALREADY_EXISTS: "Email is already taken.",
	INCORRECT_EMAIL: "Incorrect email.",
	INVALID_TOKEN: "Token is invalid.",
	PASSWORDS_NOT_MATCH: "Passwords do not match.",
	UNKNOWN_ERROR: "Unknown error occurred.",
	USER_WITH_EMAIL_NOT_FOUND: "User with this email not found.",
	USERNAME_ALREADY_EXISTS: "Username is already taken.",
} as const;

export { ErrorMessage };
