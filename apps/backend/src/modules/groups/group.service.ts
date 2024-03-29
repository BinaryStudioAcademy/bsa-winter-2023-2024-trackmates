import { HTTPCode, PermissionKey } from "~/libs/enums/enums.js";
import {
	changeCase,
	convertPageToZeroIndexed,
} from "~/libs/helpers/helpers.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
	type Service,
} from "~/libs/types/types.js";

import {
	type PermissionRepository,
	type PermissionsGetAllResponseDto,
} from "../permissions/permissions.js";
import { type UserService } from "../users/users.js";
import { GroupEntity } from "./group.entity.js";
import { type GroupRepository } from "./group.repository.js";
import { GroupErrorMessage } from "./libs/enums/enums.js";
import { GroupError } from "./libs/exceptions/exceptions.js";
import {
	type GroupCreateRequestDto,
	type GroupRequestDto,
	type GroupResponseDto,
	type GroupsGetAllResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	groupRepository: GroupRepository;
	permissionRepository: PermissionRepository;
	userService: UserService;
};

class GroupService implements Service {
	private groupRepository: GroupRepository;
	private permissionRepository: PermissionRepository;
	private userService: UserService;

	public constructor({
		groupRepository,
		permissionRepository,
		userService,
	}: Constructor) {
		this.groupRepository = groupRepository;
		this.permissionRepository = permissionRepository;
		this.userService = userService;
	}

	public async create(group: GroupCreateRequestDto): Promise<GroupResponseDto> {
		const { name, permissions: permissionKeys } = group;
		const key = changeCase(name, "kebab");

		const groupByKey = await this.groupRepository.findByKey(key);
		const groupByName = await this.groupRepository.findByName(name);

		if (groupByKey || groupByName) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { items: permissions } = await this.permissionRepository.findAll({
			keys: permissionKeys,
		});

		const createdGroup = await this.groupRepository.create(
			GroupEntity.initializeNew({ key, name, permissions }),
		);

		return createdGroup.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const groupById = await this.groupRepository.find(id);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.groupRepository.delete(id);
	}

	public async deleteWithUserCheck(
		groupId: number,
		currentUserId: number,
	): Promise<boolean> {
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const hasGroup = await this.groupRepository.findUserInGroup(
			groupId,
			currentUserId,
		);

		if (hasGroup) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_DELETION_FORBIDDEN,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return await this.groupRepository.delete(groupId);
	}

	public async find(id: number): Promise<GroupResponseDto> {
		const groupById = await this.groupRepository.find(id);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return groupById.toObject();
	}

	public async findAll({
		count,
		page,
	}: PaginationRequestDto): Promise<PaginationResponseDto<GroupResponseDto>> {
		const { items: groups, total } = await this.groupRepository.findAll({
			count,
			page: convertPageToZeroIndexed(page),
		});

		return {
			items: groups.map((group) => {
				return group.toObject();
			}),
			total,
		};
	}

	public async findAllPermissionsInGroup(
		groupId: number,
	): Promise<PermissionsGetAllResponseDto> {
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const permissionsInGroup =
			await this.groupRepository.findAllPermissionsInGroup(groupId);

		return {
			items: permissionsInGroup.map((permission) => {
				return permission.toObject();
			}),
		};
	}

	public async findAllUserGroups(
		userId: number,
	): Promise<GroupsGetAllResponseDto> {
		void (await this.userService.findById(userId));
		const userGroups = await this.groupRepository.findAllUserGroups(userId);

		return {
			items: userGroups.map((group) => {
				return group.toObject();
			}),
		};
	}

	public async findByKey(key: string): Promise<GroupResponseDto> {
		const groupByKey = await this.groupRepository.findByKey(key);

		if (!groupByKey) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return groupByKey.toObject();
	}

	public async update(
		id: number,
		group: GroupRequestDto,
	): Promise<GroupResponseDto> {
		const groupById = await this.groupRepository.find(id);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { key, name } = group;

		const groupByKey = await this.groupRepository.findByKey(key);
		const groupByName = await this.groupRepository.findByName(name);
		const groupByKeyId = groupByKey?.toObject().id;
		const groupByNameId = groupByName?.toObject().id;

		if (
			(groupByKey && groupByKeyId !== Number(id)) ||
			(groupByName && groupByNameId !== Number(id))
		) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const updatedGroup = await this.groupRepository.update(
			id,
			GroupEntity.initializeNew({ key, name, permissions: [] }),
		);

		return updatedGroup.toObject();
	}

	public async updateGroupPermissions(
		groupId: number,
		permissionId: number,
		currentUserId: number,
	): Promise<PermissionsGetAllResponseDto> {
		const permissionById = await this.permissionRepository.find(permissionId);
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const hasGroup = await this.groupRepository.findUserInGroup(
			groupId,
			currentUserId,
		);

		if (
			hasGroup &&
			permissionById?.toObject().key === PermissionKey.MANAGE_UAM
		) {
			throw new GroupError({
				message: GroupErrorMessage.PERMISSION_CHANGE_FORBIDDEN,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const hasPermission = await this.groupRepository.findPermissionInGroup(
			groupId,
			permissionId,
		);

		const permissionsInGroup = hasPermission
			? await this.groupRepository.removePermissionFromGroup(
					groupId,
					permissionId,
				)
			: await this.groupRepository.addPermissionsToGroup(groupId, [
					permissionId,
				]);

		return {
			items: permissionsInGroup.map((permission) => {
				return permission.toObject();
			}),
		};
	}

	public async updateUserGroups(
		groupId: number,
		userId: number,
		currentUserId: number,
	): Promise<GroupsGetAllResponseDto> {
		void (await this.userService.findById(userId));
		const groupById = await this.groupRepository.find(groupId);

		if (!groupById) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		if (Number(userId) === currentUserId) {
			throw new GroupError({
				message: GroupErrorMessage.GROUP_CHANGE_FORBIDDEN,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const hasGroup = await this.groupRepository.findUserInGroup(
			groupId,
			userId,
		);

		const userGroups = hasGroup
			? await this.groupRepository.removeUserFromGroup(groupId, userId)
			: await this.groupRepository.addUserToGroup(groupId, userId);

		return {
			items: userGroups.map((group) => {
				return group.toObject();
			}),
		};
	}
}

export { GroupService };
