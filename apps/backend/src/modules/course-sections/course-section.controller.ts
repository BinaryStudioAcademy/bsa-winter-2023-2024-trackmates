import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type CourseSectionService } from "./course-section.service.js";
import { CourseSectionsApiPath } from "./libs/enums/enums.js";
import { type CourseSectionGetAllRequestDto } from "./libs/types/types.js";
import { courseSectionIdParameterValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/***
 * @swagger
 * components:
 *    schemas:
 *      CourseSection:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          courseId:
 *            type: number
 *            format: number
 *            minimum: 1
 *            readOnly: true
 */
class CourseSectionController extends BaseController {
	private courseSectionService: CourseSectionService;

	public constructor(
		logger: Logger,
		courseSectionService: CourseSectionService,
	) {
		super(logger, APIPath.COURSE_SECTIONS);

		this.courseSectionService = courseSectionService;

		this.addRoute({
			handler: (options) => {
				return this.findAllByCourseId(
					options as APIHandlerOptions<{
						query: CourseSectionGetAllRequestDto;
					}>,
				);
			},
			method: "GET",
			path: CourseSectionsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) => {
				return this.findOneBySectionId(
					options as APIHandlerOptions<{
						params: { courseSectionId: number };
					}>,
				);
			},
			method: "GET",
			path: CourseSectionsApiPath.$ID,
			validation: {
				params: courseSectionIdParameterValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /course-sections:
	 *    get:
	 *      description: Return array of all course-sections that belong to a course with provided ID in query
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - in: query
	 *          name: courseId
	 *          schema:
	 *            type: integer
	 *          required: true
	 *          description: ID of the course for which to retrieve course-sections
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/CourseSection'
	 */
	private async findAllByCourseId(
		options: APIHandlerOptions<{
			query: CourseSectionGetAllRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseSectionService.findCourseSections(
				options.query.courseId,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /course-sections/{id}:
	 *    get:
	 *      description: Return course section by provided course section id
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The section ID
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/CourseSection'
	 */
	private async findOneBySectionId(
		options: APIHandlerOptions<{
			params: { courseSectionId: number };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseSectionService.find(
				options.params.courseSectionId,
			),
			status: HTTPCode.OK,
		};
	}
}

export { CourseSectionController };
