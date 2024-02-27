import { config } from "../config/config.js";
import { OpenAI } from "./open-ai.module.js";

const openAI = new OpenAI({
	apiKey: config.ENV.OPENAI.API_KEY,
	model: config.ENV.OPENAI.MODEL,
});

export { openAI };
export { type OpenAI } from "./open-ai.module.js";
