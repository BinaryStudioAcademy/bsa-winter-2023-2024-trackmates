import { HTTPCode } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";

import { PermissionErrorMessage } from "./libs/enums/enums.js";
import { PermissionError } from "./libs/exceptions/exceptions.js";
import {
	type PermissionRequestDto,
	type PermissionResponseDto,
} from "./libs/types/types.js";
import { PermissionEntity } from "./permission.entity.js";
import { type PermissionRepository } from "./permission.repository.js";

class PermissionService implements Service {
	private permissionRepository: PermissionRepository;

	public constructor(permissionRepository: PermissionRepository) {
		this.permissionRepository = permissionRepository;
	}

	public async create(
		permission: PermissionRequestDto,
	): Promise<PermissionResponseDto> {
		const { key, name } = permission;
		const permissionByKey = await this.permissionRepository.findByKey(key);
		const permissionByName = await this.permissionRepository.findByName(name);

		if (permissionByKey || permissionByName) {
			throw new PermissionError({
				message: PermissionErrorMessage.PERMISSION_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const createdPermission = await this.permissionRepository.create(
			PermissionEntity.initializeNew({ key, name }),
		);

		return createdPermission.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const permissionById = await this.permissionRepository.find(id);

		if (!permissionById) {
			throw new PermissionError({
				message: PermissionErrorMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.permissionRepository.delete(id);
	}

	public async find(id: number): Promise<PermissionResponseDto> {
		const permissionById = await this.permissionRepository.find(id);

		if (!permissionById) {
			throw new PermissionError({
				message: PermissionErrorMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return permissionById.toObject();
	}

	public async findAll(): Promise<{ items: PermissionResponseDto[] }> {
		const permissions = await this.permissionRepository.findAll();

		return {
			items: permissions.map((permission) => {
				return permission.toObject();
			}),
		};
	}

	public async findByKey(key: string): Promise<PermissionResponseDto> {
		const permissionByKey = await this.permissionRepository.findByKey(key);

		if (!permissionByKey) {
			throw new PermissionError({
				message: PermissionErrorMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return permissionByKey.toObject();
	}

	public async update(
		id: number,
		permission: PermissionRequestDto,
	): Promise<PermissionResponseDto> {
		const permissionById = await this.permissionRepository.find(id);

		if (!permissionById) {
			throw new PermissionError({
				message: PermissionErrorMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { key, name } = permission;

		const permissionByKey = await this.permissionRepository.findByKey(key);
		const permissionByName = await this.permissionRepository.findByName(name);
		const permissionByKeyId = permissionByKey?.toObject().id;
		const permissionByNameId = permissionByName?.toObject().id;

		if (
			(permissionByKey && permissionByKeyId !== Number(id)) ||
			(permissionByName && permissionByNameId !== Number(id))
		) {
			throw new PermissionError({
				message: PermissionErrorMessage.PERMISSION_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const updatedPermission = await this.permissionRepository.update(
			id,
			PermissionEntity.initializeNew({ key, name }),
		);

		return updatedPermission.toObject();
	}
}

export { PermissionService };
