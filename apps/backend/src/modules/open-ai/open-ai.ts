import { config } from "~/libs/modules/config/config.js";
import { openAI } from "~/libs/modules/open-ai/open-ai.js";

import { OpenAIService } from "./open-ai.service.js";

const openAIService = new OpenAIService({
	model: config.ENV.OPENAI.MODEL,
	openAI,
});

export { openAIService };
export { type OpenAIService } from "./open-ai.service.js";
