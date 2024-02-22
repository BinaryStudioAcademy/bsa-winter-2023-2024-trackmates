import { OpenAI as LibraryOpenAI } from "openai";

import { OpenAIErrorMessage } from "./libs/enums/enums.js";
import { OpenAIError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	apiKey: string;
	model: string;
};

class OpenAI {
	private model: string;
	private openAI: LibraryOpenAI;

	constructor({ apiKey, model }: Constructor) {
		this.model = model;
		this.openAI = new LibraryOpenAI({ apiKey });
	}

	public async call(request: string) {
		const response = await this.openAI.chat.completions.create({
			messages: [{ content: request, role: "user" }],
			model: this.model,
			response_format: { type: "text" },
			temperature: 0,
		});

		const [choice] = response.choices;
		if (!choice || !choice.message.content) {
			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
			});
		}

		return choice.message.content;
	}
}

export { OpenAI };
