import { SubscriptionValidationRule } from "./subscription-validation-rule.enum.js";

const SubscriptionValidationMessage = {
	MIN_PRICE_VALUE: `Price must be at least ${SubscriptionValidationRule.MIN_PRICE_VALUE}.`,
} as const;

export { SubscriptionValidationMessage };
