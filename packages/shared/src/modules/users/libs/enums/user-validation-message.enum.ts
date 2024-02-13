import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRE: "Email is required.",
	EMAIL_WRONG: "Email is wrong.",
	PASSWORD_SHORT: `Password is too short (${UserValidationRule.PASSWORD_MINIMUM_LENGTH} characters at least).`,
} as const;

export { UserValidationMessage };
