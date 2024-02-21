import { type OpenAI } from "~/libs/modules/open-ai/open-ai.js";

import { OpenAIErrorMessage, Prompt } from "./libs/enums/enums.js";
import { OpenAIError } from "./libs/exceptions/exceptions.js";

type Constructor = {
	model: string;
	openAI: OpenAI;
};

class OpenAIService {
	private model: string;
	private openAI: OpenAI;

	constructor({ model, openAI }: Constructor) {
		this.model = model;
		this.openAI = openAI;
	}

	public async call(courses: { description: string; title: string }[]) {
		const request = `${Prompt.SORT_COURSES}\n\n${JSON.stringify(courses)}`;

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

		return JSON.parse(choice.message.content) as number[];
	}
}

export { OpenAIService };
