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
};

/**
 * @swagger
 * components:
 *    schemas:
 *      Activity:
 *        type: object
 *        properties:
 *          actionId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          payload:
 *            type: string
 *          type:
 *            type: string
 *          updatedAt:
 *            type: string
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          user:
 *            type: object
 *            $ref: "#/components/schemas/User"
 */
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

	/**
	 * @swagger
	 * /activities/finish-section:
	 *    post:
	 *      description: add FINISH_SECTION activity to DB
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                actionId:
	 *                  type: number
	 *                  format: number
	 *                  minimum: 1
	 *                payload:
	 *                  type: object
	 *                  properties:
	 *                    title:
	 *                      type: string
	 *                    course:
	 *                      type: object
	 *                      properties:
	 *                        id:
	 *                          type: number
	 *                          format: number
	 *                          minimum: 1
	 *                        title:
	 *                          type: string
	 *                        vendorId:
	 *                          type: number
	 *                          format: number
	 *                          minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Activity"
	 */
	private async apply<TYPE extends ActivityType>({
		actionId,
		payload,
		type,
		user,
	}: {
		actionId: number;
		payload: ActivityPayloadMap[TYPE];
		type: TYPE;
		user: UserAuthResponseDto;
	}): Promise<APIHandlerResponse> {
		const activity = { actionId, payload, type, userId: user.id };

		return {
			payload: await this.activityService.apply(activity),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /activities/finish-section/{id}:
	 *    delete:
	 *      description: delete FINISH_SECTION activity from DB
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: Action ID
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
	private async applyFinishSection({
		body: { actionId, payload },
		user,
	}: APIHandlerOptions<{
		body: ApplyRequestDto<"FINISH_SECTION">;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return await this.apply<"FINISH_SECTION">({
			actionId,
			payload,
			type: "FINISH_SECTION",
			user,
		});
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
		const success = await this.activityService.cancel(activity);

		return {
			payload: { success },
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

	/**
	 * @swagger
	 * /activities:
	 *    post:
	 *      description: get all user friends activities
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
	 *                      $ref: "#/components/schemas/Activity"
	 */
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
