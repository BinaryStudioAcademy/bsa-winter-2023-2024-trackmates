import { NotificationValidationRule } from "./notification-validation-rule.enum.js";

const NotificationValidationMessage = {
	ARRAY_MINIMUM_SIZE: "Array should be not empty.",
	ID_MINIMUM_VALUE: `Id must be grater or equal to ${NotificationValidationRule.ID_MINIMUM_VALUE}.`,
} as const;

export { NotificationValidationMessage };
