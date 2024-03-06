import { PaginationValidationRule } from "./pagination-validation-rule.enum.js";

const PaginationValidationMessage = {
	MIN_COUNT: `Count number should be not less than ${PaginationValidationRule.MIN_COUNT}`,
	MIN_PAGE: `Page number should be not less than ${PaginationValidationRule.MIN_PAGE}`,
} as const;

export { PaginationValidationMessage };
