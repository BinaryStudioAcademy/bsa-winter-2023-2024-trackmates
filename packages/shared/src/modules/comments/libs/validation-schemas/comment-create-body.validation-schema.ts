import { z } from "zod";

import {
	CommentValidationMessage,
	CommentValidationRule,
} from "../enums/enums.js";

const commentCreateBody = z
	.object({
		activityId: z.number().positive(),
		text: z
			.string()
			.trim()
			.min(
				CommentValidationRule.TEXT_MINIMUM_LENGTH,
				CommentValidationMessage.TEXT_MINIMUM_LENGTH,
			)
			.max(
				CommentValidationRule.TEXT_MAXIMUM_LENGTH,
				CommentValidationMessage.TEXT_MAXIMUM_LENGTH,
			),
	})
	.required();

export { commentCreateBody };
