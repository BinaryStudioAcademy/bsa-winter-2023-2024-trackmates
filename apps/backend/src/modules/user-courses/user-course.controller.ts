import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { UserCoursesApiPath } from "./libs/enums/enums.js";
import { UserCourseService } from "./user-course.service.js";

class UserCourseController extends BaseController {
	private userCourseService: UserCourseService;

	public constructor(logger: Logger, userCourseService: UserCourseService) {
		super(logger, APIPath.USER_COURSES);

		this.userCourseService = userCourseService;

		this.addRoute({
			handler: (options) =>
				this.findAllByUser(
					options as APIHandlerOptions<{
						params: { userId: number };
					}>,
				),
			method: "GET",
			path: UserCoursesApiPath.USER,
		});
	}

	private async findAllByUser({
		params: { userId },
	}: APIHandlerOptions<{
		params: { userId: number };
	}>): Promise<APIHandlerResponse> {
		const courses = await this.userCourseService.findAllByUser(userId);
		return {
			payload: { courses },
			status: HTTPCode.OK,
		};
	}
}

export { UserCourseController };
