import { APIPath } from "~/libs/enums/enums.js";
import { checkUserSubscription } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationRequestDto } from "~/libs/types/types.js";
import { type AddCourseRequestDto } from "~/modules/courses/libs/types/types.js";
import { addCourseValidationSchema } from "~/modules/courses/libs/validation-schemas/validation-schemas.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { UserCoursesApiPath } from "./libs/enums/enums.js";
import {
	userCourseGetAllQueryValidationSchema,
	userIdParameterValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type UserCourseService } from "./user-course.service.js";

class UserCourseController extends BaseController {
	private userCourseService: UserCourseService;

	public constructor(logger: Logger, userCourseService: UserCourseService) {
		super(logger, APIPath.USER_COURSES);

		this.userCourseService = userCourseService;

		this.addRoute({
			handler: (options) => {
				return this.addCourse(
					options as APIHandlerOptions<{
						body: AddCourseRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: UserCoursesApiPath.ROOT,
			validation: {
				body: addCourseValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.findAllByUser(
					options as APIHandlerOptions<{
						params: { userId: string };
						query: { search: string } & PaginationRequestDto;
					}>,
				);
			},
			method: "GET",
			path: UserCoursesApiPath.$USER_ID,
			validation: {
				params: userIdParameterValidationSchema,
				query: userCourseGetAllQueryValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.findCommon(
					options as APIHandlerOptions<{
						params: { userId: string };
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: UserCoursesApiPath.$USER_ID_COMMON,
			preHandlers: [checkUserSubscription],
			validation: {
				params: userIdParameterValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /user-courses:
	 *    post:
	 *      tags:
	 *        - User courses
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
	private async addCourse({
		body,
		user,
	}: APIHandlerOptions<{
		body: AddCourseRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.userCourseService.addCourse({
				...body,
				userId: user.id,
			}),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /user-courses/{userId}:
	 *   get:
	 *     tags:
	 *       - User courses
	 *     description: Return all user courses
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: userId
	 *         in: path
	 *         description: The vendor ID
	 *         required: true
	 *         schema:
	 *           type: integer
	 *           minimum: 1
	 *       - in: query
	 *         name: search
	 *         schema:
	 *           type: string
	 *       - name: count
	 *         in: query
	 *         schema:
	 *           type: integer
	 *       - name: page
	 *         in: query
	 *         schema:
	 *           type: string
	 *           minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 courses:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     $ref: '#/components/schemas/Course'
	 */
	private async findAllByUser({
		params: { userId },
		query: { count, page, search },
	}: APIHandlerOptions<{
		params: { userId: string };
		query: { search: string | undefined } & PaginationRequestDto;
	}>): Promise<APIHandlerResponse> {
		const { items, total } = await this.userCourseService.findAllByUser({
			count,
			page,
			search: search ?? "",
			userId: Number(userId),
		});

		return {
			payload: { items, total },
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /user-courses/{userId}/common:
	 *   get:
	 *     tags:
	 *       - User courses
	 *     description: Return all common courses
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: userId
	 *         in: path
	 *         description: The user to compare ID
	 *         required: true
	 *         schema:
	 *           type: integer
	 *           minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 courses:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     $ref: '#/components/schemas/Course'
	 */
	private async findCommon({
		params: { userId },
		user,
	}: APIHandlerOptions<{
		params: { userId: string };
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.userCourseService.findCommonCourses({
				currentUserId: user.id,
				userId: Number(userId),
			}),
			status: HTTPCode.OK,
		};
	}
}

export { UserCourseController };
