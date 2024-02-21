import OpenAI from "openai";

import { config } from "../config/config.js";

const openAI = new OpenAI({ apiKey: config.ENV.OPENAI.API_KEY });

export { openAI };
export { type OpenAI } from "openai";
