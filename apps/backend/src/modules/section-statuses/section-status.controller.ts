import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { SectionStatusesApiPath } from "./libs/enums/enums.js";
import {
	type SectionStatusAddRequestDto,
	type SectionStatusGetAllRequestDto,
	type SectionStatusUpdateRequestDto,
} from "./libs/types/types.js";
import {
	sectionStatusCreateBodyValidationSchema,
	sectionStatusUpdateBodyValidationSchema,
	sectionStatusUpdateQueryValidationSchema,
	sectionStatusesGetAllQueryValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type SectionStatusService } from "./section-status.service.js";

class SectionStatusController extends BaseController {
	private sectionStatusService: SectionStatusService;

	public constructor(
		logger: Logger,
		sectionStatusService: SectionStatusService,
	) {
		super(logger, APIPath.SECTION_STATUSES);

		this.sectionStatusService = sectionStatusService;

		this.addRoute({
			handler: (options) => {
				return this.createStatus(
					options as APIHandlerOptions<{
						body: SectionStatusAddRequestDto;
					}>,
				);
			},
			method: "POST",
			path: SectionStatusesApiPath.ROOT,
			validation: {
				body: sectionStatusCreateBodyValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findAllByCourseIdAndUserId(
					options as APIHandlerOptions<{
						query: SectionStatusGetAllRequestDto;
					}>,
				);
			},
			method: "GET",
			path: SectionStatusesApiPath.ROOT,
			validation: {
				query: sectionStatusesGetAllQueryValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.updateStatus(
					options as APIHandlerOptions<{
						body: SectionStatusUpdateRequestDto;
						params: Record<"id", number>;
					}>,
				);
			},
			method: "POST",
			path: SectionStatusesApiPath.$ID,
			validation: {
				body: sectionStatusUpdateBodyValidationSchema,
				params: sectionStatusUpdateQueryValidationSchema,
			},
		});
	}

	private async createStatus(
		options: APIHandlerOptions<{
			body: SectionStatusAddRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.sectionStatusService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findAllByCourseIdAndUserId(
		options: APIHandlerOptions<{
			query: SectionStatusGetAllRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { courseId, userId } = options.query;

		return {
			payload: await this.sectionStatusService.findAllByCourseIdAndUserId({
				courseId,
				userId,
			}),
			status: HTTPCode.OK,
		};
	}

	private async updateStatus(
		options: APIHandlerOptions<{
			body: SectionStatusUpdateRequestDto;
			params: Record<"id", number>;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.sectionStatusService.update(
				options.params.id,
				options.body,
			),
			status: HTTPCode.OK,
		};
	}
}

export { SectionStatusController };
