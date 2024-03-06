import { CommentValidationRule } from "./comment-validation-rule.enum.js";

const CommentValidationMessage = {
	TEXT_MAXIMUM_LENGTH: `Maximum text length – ${CommentValidationRule.TEXT_MAXIMUM_LENGTH}`,
	TEXT_MINIMUM_LENGTH: `Minimum text length – ${CommentValidationRule.TEXT_MINIMUM_LENGTH}`,
};

export { CommentValidationMessage };
