import {
	APIPath,
	HTTPCode,
	PermissionKey,
	PermissionMode,
} from "~/libs/enums/enums.js";
import { checkUserPermissions } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationRequestDto } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type GroupService } from "./group.service.js";
import { GroupsApiPath } from "./libs/enums/enums.js";
import {
	type GroupCreateRequestDto,
	type GroupRequestDto,
} from "./libs/types/types.js";
import {
	groupCreateRequestValidationSchema,
	groupGetAllQueryValidationSchema,
	groupIdAndPermissionIdParametersValidationSchema,
	groupIdAndUserIdParametersValidationSchema,
	groupIdParameterValidationSchema,
	groupRequestBodyValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         key:
 *           type: string
 *         name:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             type: object
 *             $ref: "#/components/schemas/Permission"
 */
class GroupController extends BaseController {
	private groupService: GroupService;

	public constructor(logger: Logger, groupService: GroupService) {
		super(logger, APIPath.GROUPS);
		this.groupService = groupService;

		this.addRoute({
			handler: (options) => {
				return this.create(
					options as APIHandlerOptions<{
						body: GroupCreateRequestDto;
					}>,
				);
			},
			method: "POST",
			path: GroupsApiPath.ROOT,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				body: groupCreateRequestValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.delete(
					options as APIHandlerOptions<{
						params: Record<"groupId", number>;
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "DELETE",
			path: GroupsApiPath.$GROUP_ID,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				params: groupIdParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.find(
					options as APIHandlerOptions<{
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "GET",
			path: GroupsApiPath.$GROUP_ID,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				params: groupIdParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findAll(
					options as APIHandlerOptions<{
						query: PaginationRequestDto;
					}>,
				);
			},
			method: "GET",
			path: GroupsApiPath.ROOT,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_UAM, PermissionKey.MANAGE_USERS],
					PermissionMode.ONE_OF,
				),
			],
			validation: {
				query: groupGetAllQueryValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findAllPermissionsInGroup(
					options as APIHandlerOptions<{
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "GET",
			path: GroupsApiPath.$GROUP_ID_PERMISSIONS,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				params: groupIdParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: GroupRequestDto;
						params: Record<"groupId", number>;
					}>,
				);
			},
			method: "PATCH",
			path: GroupsApiPath.$GROUP_ID,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				body: groupRequestBodyValidationSchema,
				params: groupIdParameterValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.updateGroupPermissions(
					options as APIHandlerOptions<{
						params: { groupId: number; permissionId: number };
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "PUT",
			path: GroupsApiPath.$GROUP_ID_PERMISSIONS_$PERMISSION_ID,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				params: groupIdAndPermissionIdParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.updateUserGroups(
					options as APIHandlerOptions<{
						params: { groupId: number; userId: number };
						user: UserAuthResponseDto;
					}>,
				);
			},
			method: "PUT",
			path: GroupsApiPath.$GROUP_ID_USERS_$USER_ID,
			preHandlers: [
				checkUserPermissions([PermissionKey.MANAGE_UAM], PermissionMode.ALL_OF),
			],
			validation: {
				params: groupIdAndUserIdParametersValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /groups:
	 *    post:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Create a new group
	 *      requestBody:
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                name:
	 *                  type: string
	 *                permissions:
	 *                  type: array
	 *                  items:
	 *                    type: string
	 *                    minimum: 1
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Group"
	 */
	private async create({
		body,
	}: APIHandlerOptions<{
		body: GroupCreateRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.create(body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /groups/{id}:
	 *    delete:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Delete group by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The group id
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
	 *                type: boolean
	 */
	private async delete({
		params,
		user,
	}: APIHandlerOptions<{
		params: Record<"groupId", number>;
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.deleteWithUserCheck(
				params.groupId,
				user.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{id}:
	 *    get:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Find group by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The group id
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
	 *                $ref: "#/components/schemas/Group"
	 */
	private async find({
		params,
	}: APIHandlerOptions<{
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.find(params.groupId),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups:
	 *    get:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Get all groups
	 *      parameters:
	 *        - name: page
	 *          in: query
	 *          description: Page number
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *            required: false
	 *        - name: count
	 *          in: query
	 *          description: Item count on page
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *            required: false
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
	 *                      $ref: "#/components/schemas/Group"
	 */
	private async findAll({
		query,
	}: APIHandlerOptions<{
		query: PaginationRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.findAll(query),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{groupId}/permissions:
	 *    get:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Get all group permissions
	 *      parameters:
	 *        - name: groupId
	 *          in: path
	 *          description: The group id
	 *          required: true
	 *          schema:
	 *            type: number
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
	 *                      $ref: "#/components/schemas/Permission"
	 */
	private async findAllPermissionsInGroup({
		params,
	}: APIHandlerOptions<{
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.findAllPermissionsInGroup(
				params.groupId,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{id}:
	 *    patch:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Update group by id
	 *      parameters:
	 *        - name: id
	 *          in: path
	 *          description: The group id
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
	 *                key:
	 *                  type: string
	 *                name:
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                $ref: "#/components/schemas/Group"
	 */
	private async update({
		body,
		params,
	}: APIHandlerOptions<{
		body: GroupRequestDto;
		params: Record<"groupId", number>;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.update(params.groupId, body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{groupId}/permissions/{permissionId}:
	 *    put:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Update group permissions
	 *      parameters:
	 *        - name: groupId
	 *          in: path
	 *          description: The group id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *        - name: permissionId
	 *          in: path
	 *          description: The permission id
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
	 *                type: array
	 *                items:
	 *                  type: object
	 *                  $ref: "#/components/schemas/Permission"
	 */
	private async updateGroupPermissions({
		params,
		user,
	}: APIHandlerOptions<{
		params: { groupId: number; permissionId: number };
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.updateGroupPermissions(
				params.groupId,
				params.permissionId,
				user.id,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{groupId}/users/{userId}:
	 *    put:
	 *      tags:
	 *        - Groups
	 *      security:
	 *        - bearerAuth: []
	 *      description: Update user groups
	 *      parameters:
	 *        - name: groupId
	 *          in: path
	 *          description: The group id
	 *          required: true
	 *          schema:
	 *            type: number
	 *            minimum: 1
	 *        - name: userId
	 *          in: path
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
	 *                type: array
	 *                items:
	 *                  type: object
	 *                  $ref: "#/components/schemas/Group"
	 */
	private async updateUserGroups({
		params,
		user,
	}: APIHandlerOptions<{
		params: { groupId: number; userId: number };
		user: UserAuthResponseDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.updateUserGroups(
				params.groupId,
				params.userId,
				user.id,
			),
			status: HTTPCode.OK,
		};
	}
}

export { GroupController };
