import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	ADJACENT_HYPHEN_APOSTROPHE:
		"Hyphen and apostrophe can’t be next to each other",
	EMAIL_INVALID_FORMAT: "The email is invalid",
	EMAIL_WRONG: "Email is wrong",
	FIELD_REQUIRE: "This field is required",
	FIRST_LAST_CHARACTERS_ONLY_LETTERS:
		"First and last characters must be letters",
	FIRST_NAME_INVALID_CHARACTERS:
		"Latin letters, hyphen and apostrophe are allowed",
	FIRST_NAME_MAX_LENGTH: `First name must not be more than ${UserValidationRule.FIRST_NAME_MAX_LENGTH} characters long`,
	FIRST_NAME_MIN_LENGTH: `First name must be at least ${UserValidationRule.FIRST_NAME_MINIMUM_LENGTH} characters long`,
	LAST_NAME_INVALID_CHARACTERS:
		"Latin letters, hyphen and apostrophe are allowed",
	LAST_NAME_MAX_LENGTH: `Last name must not be more than ${UserValidationRule.LAST_NAME_MAX_LENGTH} characters long`,
	LAST_NAME_MIN_LENGTH: `Last name must be at least ${UserValidationRule.LAST_NAME_MINIMUM_LENGTH} characters long`,
	PASSSWORD_MAX_LENGTH: `The field shouldn't contain more than ${UserValidationRule.PASSWORD_MAX_LENGTH} characters`,
	PASSWORD_INVALID_FORMAT:
		"Only Latin letters, digits and special characters are allowed",
	PASSWORD_MIN_LENGTH: `The field should contain at least ${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters`,
	PASSWORD_SHORT: `Password is too short (${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters at least)`,
} as const;

export { UserValidationMessage };
