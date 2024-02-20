import { APIPath, HTTPCode } from "~/libs/enums/enums.js";
import {
	APIHandlerOptions,
	APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { RecommendedCoursesApiPath } from "./libs/enums/enums.js";
import { type RecommendedCoursesRequestDto } from "./libs/types/types.js";
import { type OpenAiService } from "./open-ai.service.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      Course:
 *        type: object
 *        properties:
 *          description:
 *            type: string
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          image:
 *            type: string
 *          imageSmall:
 *            type: string
 *          title:
 *            type: string
 *          url:
 *            type: string
 *          vendor:
 *            type: object
 *            $ref: "#/components/schemas/Vendor"
 *          vendorCourseId:
 *            type: string
 */
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
			path: RecommendedCoursesApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /recommended-courses:
	 *    get:
	 *      description: Return recommended courses from OpenAI
	 *      parameters:
	 *        - name: count
	 *          in: query
	 *          type: number
	 *          description: number of recommended courses to return
	 *        - name: page
	 *          in: query
	 *          type: number
	 *        - name: pageSize
	 *          in: query
	 *          type: number
	 *        - name: search
	 *          in: query
	 *          type: string
	 *        - name: vendors
	 *          in: query
	 *          type: string
	 *          description: keys of vendors separated by commas. Example - "udemy,coursera"
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  courses:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      $ref: "#/components/schemas/Course"
	 */
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
