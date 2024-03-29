import { APIPath, PermissionKey, PermissionMode } from "~/libs/enums/enums.js";
import {
	checkUserPermissions,
	checkUserSubscription,
} from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationRequestDto } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type CourseService } from "./course.service.js";
import { CoursesApiPath } from "./libs/enums/enums.js";
import {
	type AddCourseRequestDto,
	type CourseSearchRequestDto,
	type CourseUpdateRequestDto,
} from "./libs/types/types.js";
import {
	addCourseValidationSchema,
	courseGetAllQueryValidationSchema,
	courseIdParameterValidationSchema,
	courseUpdateValidationSchema,
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
 *
 *      CourseWithOwnership:
 *        allOf:
 *          - $ref: "#/components/schemas/Course"
 *          - type: object
 *            properties:
 *              isUserHasCourse:
 *                type: boolean
 *                description: Indicates whether the user has the course or not
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
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_COURSES],
					PermissionMode.ALL_OF,
				),
			],
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
			path: CoursesApiPath.FROM_VENDORS,
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
			preHandlers: [checkUserSubscription],
		});
		this.addRoute({
			handler: (options) => {
				return this.updateFromVendor(
					options as APIHandlerOptions<{
						params: { courseId: string };
					}>,
				);
			},
			method: "PUT",
			path: CoursesApiPath.FROM_VENDORS_$COURSE_ID,
			validation: {
				params: courseIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.findAll(
					options as APIHandlerOptions<{ query: PaginationRequestDto }>,
				);
			},
			method: "GET",
			path: CoursesApiPath.ROOT,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_COURSES],
					PermissionMode.ALL_OF,
				),
			],
			validation: {
				query: courseGetAllQueryValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: CourseUpdateRequestDto;
						params: { courseId: string };
					}>,
				);
			},
			method: "PUT",
			path: CoursesApiPath.$COURSE_ID,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_COURSES],
					PermissionMode.ALL_OF,
				),
			],
			validation: {
				body: courseUpdateValidationSchema,
				params: courseIdParameterValidationSchema,
			},
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
	 *          description: The course ID
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
	 * /courses:
	 *    get:
	 *      tags:
	 *        - Courses
	 *      description: Return all courses from database
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: page
	 *          in: query
	 *          description: Page number
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *            required: true
	 *        - name: count
	 *          in: query
	 *          description: Item count on page
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *            required: true
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
	private async findAll({
		query: { count, page },
	}: APIHandlerOptions<{
		query: PaginationRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.findAll({ count, page }),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/from-vendors:
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
	 *                      $ref: "#/components/schemas/CourseWithOwnership"
	 */
	private async findAllByVendors({
		query,
		user,
	}: APIHandlerOptions<{
		query: CourseSearchRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const { page, search, vendorsKey } = query;

		return {
			payload: await this.courseService.findAllByVendors({
				page,
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
	 *                      $ref: "#/components/schemas/CourseWithOwnership"
	 */
	private async getRecommendedCoursesByAI({
		query,
		user,
	}: APIHandlerOptions<{
		query: CourseSearchRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const { page, search, vendorsKey } = query;

		return {
			payload: await this.courseService.getRecommendedCoursesByAI({
				page,
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
	 *      description: Update course title
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The course ID
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            minimum: 1
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                title:
	 *                  type: string
	 *                  minLength: 1
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
		body,
		params: { courseId },
	}: APIHandlerOptions<{
		body: CourseUpdateRequestDto;
		params: { courseId: string };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.update(Number(courseId), body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /courses/from-vendor/{id}:
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
	private async updateFromVendor({
		params: { courseId },
	}: APIHandlerOptions<{
		params: { courseId: string };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.courseService.updateFromVendor(Number(courseId)),
			status: HTTPCode.OK,
		};
	}
}

export { CourseController };
