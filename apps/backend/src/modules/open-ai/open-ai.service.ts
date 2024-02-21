import { type OpenAI } from "~/libs/modules/open-ai/open-ai.js";

import { OpenAiErrorMessage, Prompt } from "./libs/enums/enums.js";
import { OpenAiError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	model: string;
	openAi: OpenAI;
};

class OpenAiService {
	private model: string;
	private openAi: OpenAI;

	constructor({ model, openAi }: Constructor) {
		this.model = model;
		this.openAi = openAi;
	}

	public async call(courses: { description: string; title: string }[]) {
		const request = `${Prompt.SORT_COURSES}\n\n${JSON.stringify(courses)}`;

		const response = await this.openAi.chat.completions.create({
			messages: [{ content: request, role: "user" }],
			model: this.model,
			response_format: { type: "text" },
			temperature: 0,
		});

		const [choice] = response.choices;
		if (!choice || !choice.message.content) {
			throw new OpenAiError({
				message: OpenAiErrorMessage.WRONG_RESPONSE,
			});
		}

		return JSON.parse(choice.message.content) as number[];
	}
}

export { OpenAiService };
