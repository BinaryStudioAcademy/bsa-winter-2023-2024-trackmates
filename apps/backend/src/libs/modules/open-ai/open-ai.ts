import OpenAI from "openai";

import { config } from "../config/config.js";

const openAi = new OpenAI({ apiKey: config.ENV.OPENAI.API_KEY });

export { openAi };
export { type OpenAI } from "openai";
