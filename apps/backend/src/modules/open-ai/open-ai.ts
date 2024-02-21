import { config } from "~/libs/modules/config/config.js";
import { openAi } from "~/libs/modules/open-ai/open-ai.js";

import { OpenAiService } from "./open-ai.service.js";

const openAiService = new OpenAiService({
	model: config.ENV.OPENAI.MODEL,
	openAi,
});

export { openAiService };
export { type OpenAiService } from "./open-ai.service.js";
