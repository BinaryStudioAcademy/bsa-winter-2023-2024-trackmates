import { z } from "zod";

import {
	PaginationValidationMessage,
	PaginationValidationRule,
} from "../../../../libs/enums/enums.js";

const userGetAllQuery = z
	.object({
		count: z.coerce
			.number()
			.min(
				PaginationValidationRule.MIN_COUNT,
				PaginationValidationMessage.MIN_COUNT,
			),
		page: z.coerce
			.number()
			.min(
				PaginationValidationRule.MIN_PAGE,
				PaginationValidationMessage.MIN_PAGE,
			),
	})
	.required();

export { userGetAllQuery };
