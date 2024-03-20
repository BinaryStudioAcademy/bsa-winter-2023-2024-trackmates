import { type FastifyRequest } from "fastify";

import { APIPath } from "~/libs/enums/enums.js";
import { checkIsEqual } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type CommentService } from "./comment.service.js";
import { CommentsApiPath } from "./libs/enums/enums.js";
import {
	type CommentCreateRequestDto,
	type CommentGetAllRequestDto,
	type CommentUpdateRequestDto,
	type CommentWithRelationsResponseDto,
} from "./libs/types/types.js";
import {
	commentCreateBodyValidationSchema,
	commentGetAllQueryValidationSchema,
	commentIdParameterValidationSchema,
	commentTextValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      Comment:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            readOnly: true
 *          text:
 *            type: string
 *            minLength: 1
 *          userId:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            readOnly: true
 *          activityId:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            readOnly: true
 */

class CommentController extends BaseController {
	private commentService: CommentService;

	public constructor(logger: Logger, commentService: CommentService) {
		super(logger, APIPath.COMMENTS);

		this.commentService = commentService;

		this.addRoute({
			handler: (options) => {
				return this.findAllByActivityId(
					options as APIHandlerOptions<{
						query: CommentGetAllRequestDto;
					}>,
				);
			},
			method: "GET",
			path: CommentsApiPath.ROOT,
			validation: {
				query: commentGetAllQueryValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findById(
					options as APIHandlerOptions<{
						params: Record<"id", number>;
					}>,
				);
			},
			method: "GET",
			path: CommentsApiPath.$ID,
			validation: {
				params: commentIdParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: CommentCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "POST",
			path: CommentsApiPath.ROOT,
			validation: {
				body: commentCreateBodyValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: CommentUpdateRequestDto;
						params: Record<"id", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "PATCH",
			path: CommentsApiPath.$ID,
			validation: {
				body: commentTextValidationSchema,
				params: commentIdParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: Record<"id", number>;
					}>,
				);
			},
			method: "DELETE",
			path: CommentsApiPath.$ID,
			preHandlers: [
				checkIsEqual<
					CommentWithRelationsResponseDto,
					FastifyRequest & {
						params: Record<"id", number>;
						user: UserAuthResponseDto;
					}
				>({
					pathInDtoToCompareId: "userId",
					pathInRequestToCompareId: "user.id",
					pathInRequestToDtoId: "params.id",
					service: this.commentService,
				}),
			],
			validation: {
				params: commentIdParameterValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /comments:
	 *    post:
	 *      tags:
	 *        - Activity Comments
	 *      description: Create a new comment
	 *      security:
	 *        - bearerAuth: []
	 *      requestBody:
	 *        description: Create a new comment
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                text:
	 *                  type: string
	 *                  minLength: 1
	 *                activityId:
	 *                  type: integer
	 *                  format: int64
	 *                  minimum: 1
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Comment'
	 */
	private async create(
		options: APIHandlerOptions<{
			body: CommentCreateRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.commentService.create({
				userId: options.user.id,
				...options.body,
			}),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /comments/{id}:
	 *    delete:
	 *      tags:
	 *        - Activity Comments
	 *      description: Delete own comment by provided comment id
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The comment id
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            format: int64
	 *            minimum: 1
	 *            readOnly: true
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: boolean
	 */
	private async delete(
		options: APIHandlerOptions<{
			params: { id: number };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.commentService.delete(options.params.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /comments:
	 *    get:
	 *      tags:
	 *        - Activity Comments
	 *      description: Return array of all comments that belong to an activity with provided ID in query
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - in: query
	 *          name: activityId
	 *          schema:
	 *            type: integer
	 *          required: true
	 *          description: ID of the activity for which to retrieve comments
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Comment'
	 */
	private async findAllByActivityId(
		options: APIHandlerOptions<{
			query: { activityId: number };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.commentService.findAllByActivityId(
				options.query.activityId,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /comments/{id}:
	 *    get:
	 *      tags:
	 *        - Activity Comments
	 *      description: Return comment by provided comment id
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The comment id
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            format: int64
	 *            minimum: 1
	 *            readOnly: true
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Comment'
	 */
	private async findById(
		options: APIHandlerOptions<{
			params: { id: number };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.commentService.find(options.params.id),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /comments/{id}:
	 *    patch:
	 *      tags:
	 *        - Activity Comments
	 *      description: Update an existing comment by id
	 *      security:
	 *        - bearerAuth: []
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The comment id
	 *          required: true
	 *          schema:
	 *            type: integer
	 *            format: int64
	 *            minimum: 1
	 *            readOnly: true
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                text:
	 *                  type: string
	 *                  minLength: 1
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/Comment'
	 */
	private async update(
		options: APIHandlerOptions<{
			body: CommentUpdateRequestDto;
			params: { id: number };
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.commentService.update(options.params.id, {
				payload: options.body,
				userId: options.user.id,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { CommentController };
