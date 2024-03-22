import { GroupValidationRule } from "./group-validation-rule.enum.js";

const GroupValidationErrorMessage = {
	AT_LEAST_ONE_LETTER: "Use at least one Latin letter",
	FIELD_REQUIRE: "This field is required",
	GROUP_KEY_INVALID_CHARACTERS: "Use only a-z, 0-9 & hyphen",
	GROUP_KEY_MAXIMUM_LENGTH: `Maximum length – ${GroupValidationRule.GROUP_KEY_MAXIMUM_LENGTH} characters`,
	GROUP_KEY_MINIMUM_LENGTH: `Minimum length – ${GroupValidationRule.GROUP_KEY_MINIMUM_LENGTH} characters`,
	GROUP_NAME_INVALID_CHARACTERS: "Use only A-Z, a-z & 0-9",
	GROUP_NAME_MAXIMUM_LENGTH: `Maximum length – ${GroupValidationRule.GROUP_NAME_MAXIMUM_LENGTH} characters`,
	GROUP_NAME_MINIMUM_LENGTH: `Minimum length – ${GroupValidationRule.GROUP_NAME_MINIMUM_LENGTH} characters`,
	INVALID_ID: "Id should be greater than or equal to 1",
	PERMISSIONS_ARRAY_MINIMUM_LENGTH: "Array of permission should be not empty",
} as const;

export { GroupValidationErrorMessage };
