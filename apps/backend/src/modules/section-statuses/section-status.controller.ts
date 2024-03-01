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
	sectionStatusGetAllQueryValidationSchema,
	sectionStatusUpdateBodyValidationSchema,
	sectionStatusUpdateQueryValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type SectionStatusService } from "./section-status.service.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     SectionStatus:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         id:
 *           type: number
 *           minimum: 1
 *           readOnly: true
 *         userId:
 *           type: number
 *           minimum: 1
 *           readOnly: true
 *         courseSectionId:
 *           type: number
 *           minimum: 1
 *           readOnly: true
 *         status:
 *           type: string
 *           enum: [completed, in-progress]
 */
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
				query: sectionStatusGetAllQueryValidationSchema,
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
			method: "PATCH",
			path: SectionStatusesApiPath.$ID,
			validation: {
				body: sectionStatusUpdateBodyValidationSchema,
				params: sectionStatusUpdateQueryValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /section-statuses:
	 *    post:
	 *      tags:
	 *        - Section statuses
	 *      security:
	 *        - bearerAuth: []
	 *      description: Create a section status
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
	 *                courseSectionId:
	 *                  type: number
	 *                  minimum: 1
	 *                status:
	 *                  type: string
	 *                  enum: [completed, in-progress]
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/SectionStatus"
	 */
	private async createStatus(
		options: APIHandlerOptions<{
			body: SectionStatusAddRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.sectionStatusService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /section-statuses:
	 *    get:
	 *      tags:
	 *        - Section statuses
	 *      security:
	 *        - bearerAuth: []
	 *      description: Find all section statuses by course for user
	 *      parameters:
	 *        - name: courseId
	 *          in: query
	 *          description: The course id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *        - name: userId
	 *          in: query
	 *          description: The user id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  items:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      $ref: "#/components/schemas/SectionStatus"
	 */
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

	/**
	 * @swagger
	 * /section-statuses/{id}:
	 *    patch:
	 *      tags:
	 *        - Section statuses
	 *      security:
	 *        - bearerAuth: []
	 *      description: Update section status
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The status id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                  status:
	 *                    type: string
	 *                    enum: [completed, in-progress]
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/SectionStatus"
	 */
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
