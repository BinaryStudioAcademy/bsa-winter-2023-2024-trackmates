import { openAI } from "~/libs/modules/open-ai/open-ai.js";
import { ValueOf } from "~/libs/types/types.js";

import {
	OpenAIErrorMessage,
	OpenAIProperties,
	Prompt,
} from "./libs/enums/enums.js";
import { ApplicationError } from "./libs/exceptions/exceptions.js";
import {
	type CourseDto,
	type CourseOpenAIRequest,
	type CourseOpenAIResponse,
} from "./libs/types/types.js";

class OpenAIService {
	private getOpenAIRequest<T>(prompt: ValueOf<typeof Prompt>, body: T) {
		return `${prompt}\n\n${JSON.stringify(body)}`;
	}

	private async getResponseFromOpenAI(request: string) {
		const response = await openAI.chat.completions.create({
			messages: [{ content: request, role: OpenAIProperties.ROLE }],
			model: OpenAIProperties.MODEL,
			response_format: OpenAIProperties.RESPONSE_FORMAT,
			temperature: OpenAIProperties.TEMPERATURE,
		});

		const [messageContent] = response.choices;
		if (!messageContent || !messageContent.message.content) {
			throw new ApplicationError({ message: OpenAIErrorMessage.NO_RESPONSE });
		}

		return messageContent.message.content;
	}

	private mapToCourseOpenAIRequest(courses: CourseDto[]): CourseOpenAIRequest {
		return courses.map((course) => ({
			description: course.description,
			id: course.id,
			title: course.title,
		}));
	}

	private mapToCourses(
		response: CourseOpenAIResponse,
		courses: CourseDto[],
	): CourseDto[] {
		return response.map((id) => {
			const courseById = courses[id];
			if (!courseById) {
				throw new ApplicationError({
					message: OpenAIErrorMessage.WRONG_RESPONSE,
				});
			}
			return courseById;
		});
	}

	public async getSortedByAICourses(courses: CourseDto[]) {
		const coursesOpenAIRequest = this.mapToCourseOpenAIRequest(courses);
		const request = this.getOpenAIRequest(
			Prompt.SORT_COURSES_BY_RECOMMENDATIONS,
			coursesOpenAIRequest,
		);

		const response = await this.getResponseFromOpenAI(request);
		const parsedResponse = JSON.parse(response) as CourseOpenAIResponse;

		return this.mapToCourses(parsedResponse, courses);
	}
}

export { OpenAIService };
