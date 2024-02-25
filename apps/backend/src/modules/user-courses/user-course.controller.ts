import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type AddCourseRequestDto } from "~/modules/courses/libs/types/types.js";
import { addCourseValidationSchema } from "~/modules/courses/libs/validation-schemas/validation-schemas.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { UserCoursesApiPath } from "./libs/enums/enums.js";
import { userIdParameterValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
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
						query: { search: string };
					}>,
				);
			},
			method: "GET",
			path: UserCoursesApiPath.$USER_ID,
			validation: {
				params: userIdParameterValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /user-courses:
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
	 *    get:
	 *      description: Return all user courses
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: userId
	 *          in: path
	 *          description: The vendor ID
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            minimum: 1
	 * 				- name: search
	 *          in: query
	 *          type: string
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
	private async findAllByUser({
		params: { userId },
		query: { search },
	}: APIHandlerOptions<{
		params: { userId: string };
		query: { search: string };
	}>): Promise<APIHandlerResponse> {
		const courses = await this.userCourseService.findAllByUser({
			search,
			userId: Number(userId),
		});

		return {
			payload: { courses },
			status: HTTPCode.OK,
		};
	}
}

export { UserCourseController };
