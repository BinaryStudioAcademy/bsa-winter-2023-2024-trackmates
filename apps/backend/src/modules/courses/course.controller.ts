import { APIPath, PermissionKey, PermissionMode } from "~/libs/enums/enums.js";
import { checkUserPermissions } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type CourseService } from "./course.service.js";
import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type CourseSearchRequestDto,
} from "./libs/types/types.js";
import {
	addCourseValidationSchema,
	courseIdParameterValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: AddCourseRequestDto;
					}>,
				);
			},
			method: "POST",
			path: CoursesApiPath.ROOT,
			validation: {
				body: addCourseValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: { courseId: string };
					}>,
				);
			},
			method: "DELETE",
			path: CoursesApiPath.$COURSE_ID,
			validation: {
				params: courseIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.find(
					options as APIHandlerOptions<{
						params: { courseId: string };
					}>,
				);
			},
			method: "GET",
			path: CoursesApiPath.$COURSE_ID,
			validation: {
				params: courseIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.findAllByVendors(
					options as APIHandlerOptions<{
						query: CourseSearchRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: CoursesApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) => {
				return this.getRecommendedCoursesByAI(
					options as APIHandlerOptions<{
						query: CourseSearchRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: CoursesApiPath.RECOMMENDED,
		});
		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						params: { courseId: string };
					}>,
				);
			},
			method: "PUT",
			path: CoursesApiPath.$COURSE_ID,
			validation: {
				params: courseIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: () => {
				return this.findAll();
			},
			method: "GET",
			path: CoursesApiPath.ALL,
			preHandler: checkUserPermissions(
				[PermissionKey.MANAGE_COURSES],
				PermissionMode.ALL_OF,
			),
		});
	}

	/**
	 * @swagger
	 * /courses:
	 *    post:
	 *      tags:
	 *        - Courses
	 *      description: Fetch course from vendor API and add for user in DB
	 *      security:
	 *        - bearerAuth: []
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
	 * /courses/{id}:
	 *    delete:
	 *      tags:
	 *        - Courses
	 *      description: Delete course by id
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The vendor ID
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
	 *                type: object
	 *                properties:
	 *                  success:
	 *                    type: boolean
	 */
	private async delete({
		params: { courseId },
	}: APIHandlerOptions<{
		params: { courseId: string };
	}>): Promise<APIHandlerResponse> {
		const success = await this.courseService.delete(Number(courseId));

		return {
			payload: { success },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/{id}:
	 *    get:
	 *      tags:
	 *        - Courses
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The vendor ID
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            minimum: 1
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
		params: { courseId },
	}: APIHandlerOptions<{
		params: { courseId: string };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.find(Number(courseId)),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/all:
	 *    get:
	 *      tags:
	 *        - Courses
	 *      description: Return all courses from database
	 *      security:
	 *        - bearerAuth: []
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
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses:
	 *    get:
	 *      tags:
	 *        - Courses
	 *      description: Return courses from vendors APIs
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: search
	 *          in: query
	 *          type: string
	 *        - name: vendorsKey
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
		const { search, vendorsKey } = query;

		return {
			payload: await this.courseService.findAllByVendors({
				search,
				userId: user.id,
				vendorsKey,
			}),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/recommended:
	 *    get:
	 *      tags:
	 *        - Courses
	 *      description: Return recommended courses
	 *      security:
	 *        - bearerAuth: []
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
	private async getRecommendedCoursesByAI({
		query,
		user,
	}: APIHandlerOptions<{
		query: CourseSearchRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const { search, vendorsKey } = query;

		return {
			payload: await this.courseService.getRecommendedCoursesByAI({
				search,
				userId: user.id,
				vendorsKey,
			}),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/{id}:
	 *    put:
	 *      tags:
	 *        - Courses
	 *      description: Update course from vendor API and save it in DB
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The vendor ID
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
	 *                type: object
	 *                $ref: "#/components/schemas/Course"
	 */
	private async update({
		params: { courseId },
	}: APIHandlerOptions<{
		params: { courseId: string };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.update(Number(courseId)),
			status: HTTPCode.OK,
		};
	}
}

export { CourseController };
