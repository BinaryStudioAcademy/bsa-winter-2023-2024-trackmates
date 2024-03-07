import { z } from "zod";

import {
	CommentValidationMessage,
	CommentValidationRule,
} from "../enums/enums.js";

const commentText = z
	.object({
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

export { commentText };
