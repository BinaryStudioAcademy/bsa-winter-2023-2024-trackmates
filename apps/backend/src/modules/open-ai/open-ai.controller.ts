import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { OpenAiApiPath } from "./libs/enums/enums.js";
import { type RecommendedCoursesRequestDto } from "./libs/types/types.js";
import { type OpenAiService } from "./open-ai.service.js";

class OpenAiController extends BaseController {
	private openAiService: OpenAiService;

	public constructor(logger: Logger, openAiService: OpenAiService) {
		super(logger, APIPath.RECOMMENDED_COURSES);

		this.openAiService = openAiService;

		this.addRoute({
			handler: (options) =>
				this.getRecommendedCourses(
					options as APIHandlerOptions<{
						query: RecommendedCoursesRequestDto;
					}>,
				),
			method: "GET",
			path: OpenAiApiPath.ROOT,
		});
	}

	private async getRecommendedCourses({
		query,
	}: APIHandlerOptions<{
		query: RecommendedCoursesRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.openAiService.getSortedByAiCourses(query),
			status: HTTPCode.OK,
		};
	}
}

export { OpenAiController };
