import { PromptInputValue } from "./prompt-input-value.enum.js";
import { PromptOutputExample } from "./prompt-output-example.enum.js";
import { PromptOutputValue } from "./prompt-output-value.js";

const Prompt = {
	SORT_COURSES_BY_RECOMMENDATIONS: `Given ${PromptInputValue.SORT_COURSES}. Return ${PromptOutputValue.SORT_COURSES}. For example: ${PromptOutputExample.SORT_COURSES}.`,
} as const;

export { Prompt };
