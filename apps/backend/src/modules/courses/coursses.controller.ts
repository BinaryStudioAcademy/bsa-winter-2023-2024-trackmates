import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type CoursesService } from "./coursses.service.js";
import { CoursesApiPath } from "./libs/enums/enums.js";

class CoursesController extends BaseController {
	private coursesService: CoursesService;

	public constructor(logger: Logger, coursesService: CoursesService) {
		super(logger, APIPath.COURSES);

		this.coursesService = coursesService;

		this.addRoute({
			handler: () => this.search(),
			method: "GET",
			path: CoursesApiPath.ROOT,
		});
	}

	private async search(): Promise<APIHandlerResponse> {
		return {
			payload: await this.coursesService.search(),
			status: HTTPCode.OK,
		};
	}
}

export { CoursesController };
