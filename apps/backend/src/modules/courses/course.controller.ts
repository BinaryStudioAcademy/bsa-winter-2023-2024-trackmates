import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { idParameterValidationSchema } from "~/libs/validation-schemas/validation-schemas.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

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
				this.create(
					options as APIHandlerOptions<{
						body: AddCourseRequestDto;
					}>,
				),
			method: "POST",
			path: CoursesApiPath.ROOT,
			validation: {
				body: addCourseValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.delete(
					options as APIHandlerOptions<{
						params: { id: number };
					}>,
				),
			method: "DELETE",
			path: CoursesApiPath.$COURSE_ID,
			validation: {
				params: idParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) =>
				this.find(
					options as APIHandlerOptions<{
						params: { id: number };
					}>,
				),
			method: "GET",
			path: CoursesApiPath.$COURSE_ID,
			validation: {
				params: idParameterValidationSchema,
			},
		});
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
				this.update(
					options as APIHandlerOptions<{
						params: { id: number };
					}>,
				),
			method: "PUT",
			path: CoursesApiPath.$COURSE_ID,
			validation: {
				params: idParameterValidationSchema,
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
	private async create({
		body,
	}: APIHandlerOptions<{
		body: AddCourseRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.create(body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /courses:
	 *    delete:
	 *      description: Delete course by id
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  success:
	 *                    type: boolean
	 */
	private async delete({
		params: { id },
	}: APIHandlerOptions<{
		params: { id: number };
	}>): Promise<APIHandlerResponse> {
		const success = await this.courseService.delete(id);

		return {
			payload: { success },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/:id:
	 *    get:
	 *      description: Get course by id from DB
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Course"
	 */
	private async find({
		params: { id },
	}: APIHandlerOptions<{
		params: { id: number };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.find(id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses:
	 *    get:
	 *      description: Return courses from vendors APIs
	 *      parameters:
	 *        - name: search
	 *          in: query
	 *          type: string
	 *        - name: vendorsKeys
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
		const { search, vendorsKeys } = query;

		return {
			payload: await this.courseService.findAllByVendors({
				search,
				userId: user.id,
				vendorsKeys,
			}),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/:id:
	 *    put:
	 *      description: Update course from vendor API and save it in DB
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Course"
	 */
	private async update({
		params: { id },
	}: APIHandlerOptions<{
		params: { id: number };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.update(id),
			status: HTTPCode.OK,
		};
	}
}

export { CourseController };
