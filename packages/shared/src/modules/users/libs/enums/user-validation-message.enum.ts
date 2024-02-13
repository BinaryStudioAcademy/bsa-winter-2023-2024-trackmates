import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_INVALID_FORMAT:
		"Invalid email format. Please enter a valid email address.",
	EMAIL_REQUIRE: "Email is required",
	EMAIL_WRONG: "Email is wrong",
	FIRSTNAME_INVALID_FORMAT:
		"Invalid format for first name. Please use only letters, hyphens, and apostrophes.",
	FIRSTNAME_MAX_LENGTH: `Username must be at most ${UserValidationRule.FIRSTNAME_MAX_LENGTH} characters long`,
	FIRSTNAME_MIN_LENGTH: `Username must be at least ${UserValidationRule.FIRSTNAME_MINIMUM_LENGTH} characters long`,
	FIRSTNAME_REQUIRE: "First name is required",
	LASTNAME_INVALID_FORMAT:
		"Invalid format for last name. Please use only letters, hyphens, and apostrophes.",
	LASTNAME_MAX_LENGTH: `Username must be at most ${UserValidationRule.LASTNAME_MAX_LENGTH} characters long`,
	LASTNAME_MIN_LENGTH: `Username must be at least ${UserValidationRule.LASTNAME_MINIMUM_LENGTH} characters long`,
	LASTNAME_REQUIRE: "Last name is required",
	PASSWORD_REQUIRE: "Password is required",
	PASSWORD_SHORT: `Password is too short (${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters at least)`,
	PASSWORD_WEAK:
		"Password must contain at least one uppercase and lowercase letter, one digit and one special character.",
	PASSWORDS_NOT_MATCH:
		"Passwords do not match. Please make sure your passwords match.",
} as const;

export { UserValidationMessage };
