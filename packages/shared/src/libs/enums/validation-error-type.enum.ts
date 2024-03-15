import { ZodIssueCode } from "zod";

const ValidationErrorType = {
	TOO_BIG: ZodIssueCode.too_big,
} as const;

export { ValidationErrorType };
