import { ReadNotificationsValidationRule } from "./read-notifications-validation-rule.enum.js";

const ReadNotificationsValidationMessages = {
	ARRAY_MINIMUM_SIZE: "Array should be not empty.",
	ID_MINIMUM_VALUE: `Id must be grater or equal to ${ReadNotificationsValidationRule.ID_MINIMUM_VALUE}.`,
};

export { ReadNotificationsValidationMessages };
