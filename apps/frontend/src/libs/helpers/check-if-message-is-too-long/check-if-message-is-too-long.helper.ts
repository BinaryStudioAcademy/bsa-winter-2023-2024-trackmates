import { FIRST_ARRAY_ITEM } from "~/libs/constants/constants.js";
import { ValidationErrorType } from "~/libs/enums/enums.js";
import { type ValidationError } from "~/libs/exceptions/exceptions.js";

const checkIfMessageIsTooLong = (error: unknown): boolean => {
	return (
		"issues" in (error as ValidationError) &&
		(error as ValidationError).issues[FIRST_ARRAY_ITEM]?.code ===
			ValidationErrorType.TOO_BIG
	);
};

export { checkIfMessageIsTooLong };
