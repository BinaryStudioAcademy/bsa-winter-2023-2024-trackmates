import { type Repository } from "~/libs/types/types.js";

import { PermissionEntity } from "./permission.entity.js";
import { type PermissionModel } from "./permission.model.js";

class PermissionRepository implements Repository<PermissionEntity> {
	private permissionModel: typeof PermissionModel;

	public constructor(permissionModel: typeof PermissionModel) {
		this.permissionModel = permissionModel;
	}

	public async create(permission: PermissionEntity): Promise<PermissionEntity> {
		const { key, name } = permission.toNewObject();
		const createdPermission = await this.permissionModel
			.query()
			.insert({ key, name })
			.returning("*")
			.execute();

		return PermissionEntity.initialize({
			createdAt: createdPermission.createdAt,
			id: createdPermission.id,
			key: createdPermission.key,
			name: createdPermission.name,
			updatedAt: createdPermission.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPermission = await this.permissionModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedPermission);
	}

	public async find(id: number): Promise<PermissionEntity | null> {
		const permissionById = await this.permissionModel
			.query()
			.findById(id)
			.execute();

		return permissionById
			? PermissionEntity.initialize({
					createdAt: permissionById.createdAt,
					id: permissionById.id,
					key: permissionById.key,
					name: permissionById.name,
					updatedAt: permissionById.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<PermissionEntity[]> {
		const permissions = await this.permissionModel.query().execute();

		return permissions.map((permission) => {
			return PermissionEntity.initialize({
				createdAt: permission.createdAt,
				id: permission.id,
				key: permission.key,
				name: permission.name,
				updatedAt: permission.updatedAt,
			});
		});
	}

	public async findByKey(key: string): Promise<PermissionEntity | null> {
		const permissionByKey = await this.permissionModel
			.query()
			.findOne({ key })
			.execute();

		return permissionByKey
			? PermissionEntity.initialize({
					createdAt: permissionByKey.createdAt,
					id: permissionByKey.id,
					key: permissionByKey.key,
					name: permissionByKey.name,
					updatedAt: permissionByKey.updatedAt,
				})
			: null;
	}

	public async findByName(name: string): Promise<PermissionEntity | null> {
		const permissionByName = await this.permissionModel
			.query()
			.findOne({ name })
			.execute();

		return permissionByName
			? PermissionEntity.initialize({
					createdAt: permissionByName.createdAt,
					id: permissionByName.id,
					key: permissionByName.key,
					name: permissionByName.name,
					updatedAt: permissionByName.updatedAt,
				})
			: null;
	}

	public async update(
		id: number,
		entity: PermissionEntity,
	): Promise<PermissionEntity> {
		const { key, name } = entity.toNewObject();
		const updatedPermission = await this.permissionModel
			.query()
			.updateAndFetchById(id, { key, name });

		return PermissionEntity.initialize({
			createdAt: updatedPermission.createdAt,
			id: updatedPermission.id,
			key: updatedPermission.key,
			name: updatedPermission.name,
			updatedAt: updatedPermission.updatedAt,
		});
	}
}

export { PermissionRepository };
