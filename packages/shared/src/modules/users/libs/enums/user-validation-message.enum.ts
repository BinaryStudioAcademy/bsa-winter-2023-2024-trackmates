import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	ADJACENT_HYPHEN_APOSTROPHE:
		"Hyphen and apostrophe can’t be next to each other",
	EMAIL_DOMAIN_PART_MAX_LENGTH: `Domain part must not be more than ${UserValidationRule.EMAIL_DOMAIN_PART_MAXIMUM_LENGTH} characters long`,
	EMAIL_INVALID_FORMAT: "Email is invalid",
	EMAIL_LOCAL_PART_MAX_LENGTH: `Local part must not be more than ${UserValidationRule.EMAIL_LOCAL_PART_MAXIMUM_LENGTH} characters long`,
	FIELD_REQUIRE: "This field is required",
	FIRST_LAST_CHARACTERS_ONLY_LETTERS:
		"First and last characters must be letters",
	FIRST_NAME_INVALID_CHARACTERS:
		"Latin letters, hyphen and apostrophe are allowed",
	FIRST_NAME_MAX_LENGTH: `First name must not be more than ${UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH} characters long`,
	FIRST_NAME_MIN_LENGTH: `First name must be at least ${UserValidationRule.FIRST_NAME_MINIMUM_LENGTH} characters long`,
	LAST_NAME_INVALID_CHARACTERS:
		"Latin letters, hyphen and apostrophe are allowed",
	LAST_NAME_MAX_LENGTH: `Last name must not be more than ${UserValidationRule.LAST_NAME_MAXIMUM_LENGTH} characters long`,
	LAST_NAME_MIN_LENGTH: `Last name must be at least ${UserValidationRule.LAST_NAME_MINIMUM_LENGTH} characters long`,
	PASSWORD_INVALID_FORMAT:
		"Latin letters, digits and special characters are allowed",
	PASSWORD_MAX_LENGTH: `Password must not be more than ${UserValidationRule.PASSWORD_MAXIMUM_LENGTH} characters long`,
	PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters long`,
} as const;

export { UserValidationMessage };
