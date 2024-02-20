import { openAi } from "~/libs/modules/open-ai/open-ai.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseService } from "../courses/courses.js";
import {
	OpenAiDefaultParameter,
	OpenAiErrorMessage,
	OpenAiProperties,
	Prompt,
} from "./libs/enums/enums.js";
import { ApplicationError } from "./libs/exceptions/exceptions.js";
import {
	type CourseDto,
	type CourseOpenAiRequest,
	type CourseOpenAiResponse,
	type RecommendedCoursesRequestDto,
	type RecommendedCoursesResponseDto,
} from "./libs/types/types.js";

class OpenAiService {
	private courseService: CourseService;

	public constructor(courseService: CourseService) {
		this.courseService = courseService;
	}

	private getOpenAiRequest<T extends object>(
		prompt: ValueOf<typeof Prompt>,
		body: T,
	) {
		return `${prompt}\n\n${JSON.stringify(body)}`;
	}

	private async getResponseFromOpenAi(request: string) {
		const response = await openAi.chat.completions.create({
			messages: [{ content: request, role: OpenAiProperties.ROLE }],
			model: OpenAiProperties.MODEL,
			response_format: OpenAiProperties.RESPONSE_FORMAT,
			temperature: OpenAiProperties.TEMPERATURE,
		});

		const [messageContent] = response.choices;
		if (!messageContent || !messageContent.message.content) {
			throw new ApplicationError({
				message: OpenAiErrorMessage.WRONG_RESPONSE,
			});
		}

		return messageContent.message.content;
	}

	private mapToCourseOpenAiRequest(courses: CourseDto[]): CourseOpenAiRequest {
		return courses.map((course) => ({
			description: course.description,
			title: course.title,
		}));
	}

	private mapToCourses(
		response: CourseOpenAiResponse,
		courses: CourseDto[],
	): CourseDto[] {
		return courses.filter((_, index) => response.includes(index));
	}

	public async getSortedByAiCourses(
		parameters: RecommendedCoursesRequestDto,
	): Promise<RecommendedCoursesResponseDto> {
		const coursesResponse =
			await this.courseService.findAllByVendor(parameters);
		const courses = coursesResponse.courses;
		const coursesOpenAiRequest = this.mapToCourseOpenAiRequest(courses);
		const openAiRequest = this.getOpenAiRequest(
			Prompt.SORT_COURSES_BY_RECOMMENDATIONS,
			coursesOpenAiRequest,
		);

		const openAiResponse = await this.getResponseFromOpenAi(openAiRequest);
		const parsedResponse = JSON.parse(openAiResponse) as CourseOpenAiResponse;
		const recommendedCourses = this.mapToCourses(parsedResponse, courses);

		const count = parameters.count ?? OpenAiDefaultParameter.COUNT;
		recommendedCourses.splice(
			recommendedCourses.length < count ? recommendedCourses.length : count,
		);

		return { courses: recommendedCourses } as RecommendedCoursesResponseDto;
	}
}

export { OpenAiService };
