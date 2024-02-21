import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { type CourseService } from "./course.service.js";
import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type CourseSearchRequestDto,
} from "./libs/types/types.js";
import { addCourseValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/*** @swagger
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
class CourseController extends BaseController {
	private courseService: CourseService;

	public constructor(logger: Logger, courseService: CourseService) {
		super(logger, APIPath.COURSES);

		this.courseService = courseService;

		this.addRoute({
			handler: (options) =>
				this.findAllByVendors(
					options as APIHandlerOptions<{
						query: CourseSearchRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: CoursesApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.addCourse(
					options as APIHandlerOptions<{
						body: AddCourseRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: CoursesApiPath.ROOT,
			validation: {
				body: addCourseValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /courses:
	 *    post:
	 *      description: Fetch course from vendor API and add for user in DB
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                vendorCourseId:
	 *                  type: string
	 *                vendorId:
	 *                  type: number
	 *                  format: number
	 *                  minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Course"
	 */
	private async addCourse({
		body,
		user,
	}: APIHandlerOptions<{
		body: AddCourseRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.addCourse({
				...body,
				userId: user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /courses:
	 *    get:
	 *      description: Return courses from vendors
	 *      parameters:
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
	private async findAllByVendors({
		query,
		user,
	}: APIHandlerOptions<{
		query: CourseSearchRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.findAllByVendors(query, user.id),
			status: HTTPCode.OK,
		};
	}
}

export { CourseController };
