import { NotificationsValidationRule } from "./notifications-validation-rule.enum.js";

const NotificationsValidationMessages = {
	ARRAY_MINIMUM_SIZE: "Array should be not empty.",
	ID_MINIMUM_VALUE: `Id must be grater or equal to ${NotificationsValidationRule.ID_MINIMUM_VALUE}.`,
};

export { NotificationsValidationMessages };
