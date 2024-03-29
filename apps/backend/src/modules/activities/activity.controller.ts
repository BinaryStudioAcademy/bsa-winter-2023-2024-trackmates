import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationRequestDto } from "~/libs/types/types.js";
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
	activityGetAllQueryValidationSchema,
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
						query: PaginationRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "GET",
			path: ActivitiesApiPath.ROOT,
			validation: {
				query: activityGetAllQueryValidationSchema,
			},
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
				return this.changeReaction(
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
	private async changeReaction({
		body,
		user,
	}: APIHandlerOptions<{
		body: ActivityLikeRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.activityService.changeLike(body.activityId, user.id),
			status: HTTPCode.OK,
		};
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
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                userId:
	 *                  type: number
	 *                  minimum: 1
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
		const success = await this.sectionStatusService.deleteActivity(
			Number(actionId),
			userId,
		);

		return {
			payload: { success },
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
	 *      parameters:
	 *        - name: count
	 *          in: query
	 *          schema:
	 *            type: integer
	 *        - name: page
	 *          in: query
	 *          schema:
	 *            type: string
	 *            minimum: 1
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
		query: { count, page },
		user,
	}: APIHandlerOptions<{
		query: PaginationRequestDto;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		const { items, total } = await this.activityService.findAll({
			count,
			page,
			userId: Number(user.id),
		});

		return {
			payload: { items, total },
			status: HTTPCode.OK,
		};
	}
}

export { ActivityController };
