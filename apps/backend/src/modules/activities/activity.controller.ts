import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type ActivityLikeRequestDto,
	activityLikeChangeValidationSchema,
} from "~/modules/activity-likes/activity-likes.js";
import { type SectionStatusService } from "~/modules/section-statuses/section-statuses.js";

import { type UserAuthResponseDto } from "../users/users.js";
import { type ActivityService } from "./activity.service.js";
import { ActivitiesApiPath } from "./libs/enums/enums.js";
import {
	type ActivityCreateRequestDto,
	type ActivityDeleteRequestDto,
} from "./libs/types/types.js";
import {
	activityActionIdParameterValidationSchema,
	activityCreateFinishSectionValidationSchema,
	activityDeleteFinishSectionValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
	private sectionStatusService: SectionStatusService;

	public constructor(
		logger: Logger,
		activityService: ActivityService,
		sectionStatusService: SectionStatusService,
	) {
		super(logger, APIPath.ACTIVITIES);

		this.activityService = activityService;
		this.sectionStatusService = sectionStatusService;

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
				return this.createFinishSection(
					options as APIHandlerOptions<{
						body: ActivityCreateRequestDto;
					}>,
				);
			},
			method: "POST",
			path: ActivitiesApiPath.FINISH_SECTION,
			validation: {
				body: activityCreateFinishSectionValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.deleteFinishSection(
					options as APIHandlerOptions<{
						body: ActivityDeleteRequestDto;
						params: { actionId: string };
					}>,
				);
			},
			method: "DELETE",
			path: ActivitiesApiPath.FINISH_SECTION_$ACTION_ID,
			validation: {
				body: activityDeleteFinishSectionValidationSchema,
				params: activityActionIdParameterValidationSchema,
			},
		});
		this.addRoute({
			handler: (options) => {
				return this.putReaction(
					options as APIHandlerOptions<{
						body: ActivityLikeRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "PATCH",
			path: ActivitiesApiPath.LIKE,
			validation: {
				body: activityLikeChangeValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /activities/finish-section:
	 *    post:
	 *      description: add FINISH_SECTION activity to DB
	 *      tags:
	 *        - Activities
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                sectionStatusId:
	 *                  type: number
	 *                  minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Activity"
	 */
	private async createFinishSection({
		body: { sectionStatusId },
	}: APIHandlerOptions<{
		body: ActivityCreateRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload:
				await this.sectionStatusService.createActivityById(sectionStatusId),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /activities/finish-section/{id}:
	 *    delete:
	 *      description: delete FINISH_SECTION activity from DB
	 *      tags:
	 *        - Activities
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
	private async deleteFinishSection({
		body: { userId },
		params: { actionId },
	}: APIHandlerOptions<{
		body: ActivityDeleteRequestDto;
		params: { actionId: string };
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.sectionStatusService.deleteActivity(
				Number(actionId),
				userId,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /activities:
	 *    get:
	 *      description: get all user friends activities
	 *      tags:
	 *        - Activities
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
			payload: await this.activityService.findAll(user.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /activities/like:
	 *    patch:
	 *      description: Set like reaction for a specific activity
	 *      tags:
	 *        - Activities
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                activityId:
	 *                  type: number
	 *                  minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Activity"
	 */
	private async putReaction({
		body,
		user,
	}: APIHandlerOptions<{
		body: ActivityLikeRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.activityService.setLike(body.activityId, user.id),
			status: HTTPCode.OK,
		};
	}
}

export { ActivityController };
