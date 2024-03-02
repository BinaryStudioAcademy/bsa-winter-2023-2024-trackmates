import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { type ActivityService } from "./activity.service.js";
import { ActivitiesApiPath } from "./libs/enums/enums.js";
import {
	type ActivityPayloadMap,
	type ActivityType,
} from "./libs/types/types.js";
import {
	actionIdParameterValidationSchema,
	applyFinishSectionValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

type ApplyRequestDto<TYPE extends ActivityType> = {
	actionId: number;
	payload: ActivityPayloadMap[TYPE];
	type: TYPE;
};

class ActivityController extends BaseController {
	private activityService: ActivityService;

	public constructor(logger: Logger, activityService: ActivityService) {
		super(logger, APIPath.ACTIVITIES);

		this.activityService = activityService;

		this.addRoute({
			handler: (options) => {
				return this.getAll(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: ActivitiesApiPath.ROOT,
		});
		this.addRoute({
			handler: (options) => {
				return this.applyFinishSection(
					options as APIHandlerOptions<{
						body: ApplyRequestDto<"FINISH_SECTION">;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: ActivitiesApiPath.FINISH_SECTION,
			validation: {
				body: applyFinishSectionValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.cancelFinishSection(
					options as APIHandlerOptions<{
						params: { actionId: string };
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "DELETE",
			path: ActivitiesApiPath.FINISH_SECTION_$ID,
			validation: {
				params: actionIdParameterValidationSchema,
			},
		});
	}

	private async apply<TYPE extends ActivityType>({
		body,
		user,
	}: APIHandlerOptions<{
		body: ApplyRequestDto<TYPE>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const { actionId, payload, type } = body;
		const activity = { actionId, payload, type, userId: user.id };

		return {
			payload: await this.activityService.apply(activity),
			status: HTTPCode.OK,
		};
	}

	private async applyFinishSection(
		options: APIHandlerOptions<{
			body: ApplyRequestDto<"FINISH_SECTION">;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return await this.apply<"FINISH_SECTION">(options);
	}

	private async cancel<TYPE extends ActivityType>({
		actionId,
		type,
		user,
	}: {
		actionId: string;
		type: TYPE;
		user: UserAuthResponseDto;
	}): Promise<APIHandlerResponse> {
		const activity = { actionId: Number(actionId), type, userId: user.id };

		return {
			payload: await this.activityService.cancel(activity),
			status: HTTPCode.OK,
		};
	}

	private async cancelFinishSection({
		params: { actionId },
		user,
	}: APIHandlerOptions<{
		params: { actionId: string };
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return await this.cancel<"FINISH_SECTION">({
			actionId,
			type: "FINISH_SECTION",
			user,
		});
	}

	private async getAll({
		user,
	}: APIHandlerOptions<{
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.activityService.getAll(user.id),
			status: HTTPCode.OK,
		};
	}
}

export { ActivityController };
