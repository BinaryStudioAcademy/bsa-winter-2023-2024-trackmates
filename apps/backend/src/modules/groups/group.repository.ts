import { SortOrder } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { SubscriptionEntity } from "~/modules/subscriptions/subscriptions.js";

import { PermissionEntity } from "../permissions/permission.entity.js";
import { type PermissionModel } from "../permissions/permission.model.js";
import { UserEntity, type UserModel } from "../users/users.js";
import { GroupEntity } from "./group.entity.js";
import { type GroupModel } from "./group.model.js";
import { RelationName } from "./libs/enums/enums.js";

class GroupRepository implements Repository<GroupEntity> {
	private groupModel: typeof GroupModel;
	private userModel: typeof UserModel;

	public constructor(
		groupModel: typeof GroupModel,
		userModel: typeof UserModel,
	) {
		this.groupModel = groupModel;
		this.userModel = userModel;
	}

	public async addPermissionsToGroup(
		groupId: number,
		permissionIds: number[],
	): Promise<PermissionEntity[]> {
		await this.groupModel
			.relatedQuery(RelationName.PERMISSIONS)
			.for(groupId)
			.relate(permissionIds)
			.execute();

		const permissions = await this.groupModel
			.relatedQuery(RelationName.PERMISSIONS)
			.for(groupId)
			.castTo<PermissionModel[]>()
			.execute();

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

	public async addUserToGroup(
		groupId: number,
		userId: number,
	): Promise<GroupEntity[]> {
		await this.userModel
			.relatedQuery(RelationName.GROUPS)
			.for(userId)
			.relate(groupId)
			.execute();

		const groups = await this.groupModel
			.query()
			.withGraphJoined(`[${RelationName.USERS}, ${RelationName.PERMISSIONS}]`)
			.where(`${RelationName.USERS}.id`, userId)
			.execute();

		return groups.map((group) => {
			return GroupEntity.initialize({
				createdAt: group.createdAt,
				id: group.id,
				key: group.key,
				name: group.name,
				permissions: group.permissions.map((permission) => {
					return PermissionEntity.initialize({
						createdAt: permission.createdAt,
						id: permission.id,
						key: permission.key,
						name: permission.name,
						updatedAt: permission.updatedAt,
					});
				}),
				updatedAt: group.updatedAt,
			});
		});
	}

	public async create(group: GroupEntity): Promise<GroupEntity> {
		const createdGroup = await this.groupModel
			.query()
			.insertGraph(group.toNewObject(), { relate: true })
			.returning("*")
			.withGraphJoined(RelationName.PERMISSIONS)
			.execute();

		return GroupEntity.initialize({
			createdAt: createdGroup.createdAt,
			id: createdGroup.id,
			key: createdGroup.key,
			name: createdGroup.name,
			permissions: createdGroup.permissions.map((permission) => {
				return PermissionEntity.initialize({
					createdAt: permission.createdAt,
					id: permission.id,
					key: permission.key,
					name: permission.name,
					updatedAt: permission.updatedAt,
				});
			}),
			updatedAt: createdGroup.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedGroup = await this.groupModel.query().deleteById(id).execute();

		return Boolean(deletedGroup);
	}

	public async find(id: number): Promise<GroupEntity | null> {
		const groupById = await this.groupModel
			.query()
			.withGraphJoined(RelationName.PERMISSIONS)
			.findById(id)
			.execute();

		return groupById
			? GroupEntity.initialize({
					createdAt: groupById.createdAt,
					id: groupById.id,
					key: groupById.key,
					name: groupById.name,
					permissions: groupById.permissions.map((permission) => {
						return PermissionEntity.initialize({
							createdAt: permission.createdAt,
							id: permission.id,
							key: permission.key,
							name: permission.name,
							updatedAt: permission.updatedAt,
						});
					}),
					updatedAt: groupById.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<{ items: GroupEntity[] }> {
		const groups = await this.groupModel
			.query()
			.withGraphJoined(RelationName.PERMISSIONS)
			.orderBy("id", SortOrder.ASC)
			.execute();

		return {
			items: groups.map((group) => {
				return GroupEntity.initialize({
					createdAt: group.createdAt,
					id: group.id,
					key: group.key,
					name: group.name,
					permissions: group.permissions.map((permission) => {
						return PermissionEntity.initialize({
							createdAt: permission.createdAt,
							id: permission.id,
							key: permission.key,
							name: permission.name,
							updatedAt: permission.updatedAt,
						});
					}),
					updatedAt: group.updatedAt,
				});
			}),
		};
	}

	public async findAllPermissionsInGroup(
		groupId: number,
	): Promise<PermissionEntity[]> {
		const permissions = await this.groupModel
			.relatedQuery(RelationName.PERMISSIONS)
			.for(groupId)
			.join(RelationName.GROUPS, "groupId", `${RelationName.GROUPS}.id`)
			.select(`${RelationName.PERMISSIONS}.*`)
			.castTo<PermissionModel[]>()
			.execute();

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

	public async findAllUserGroups(userId: number): Promise<GroupEntity[]> {
		const groups = await this.userModel
			.relatedQuery(RelationName.GROUPS)
			.for(userId)
			.withGraphFetched(RelationName.PERMISSIONS)
			.castTo<GroupModel[]>()
			.execute();

		return groups.map((group) => {
			return GroupEntity.initialize({
				createdAt: group.createdAt,
				id: group.id,
				key: group.key,
				name: group.name,
				permissions: group.permissions.map((permission) => {
					return PermissionEntity.initialize({
						createdAt: permission.createdAt,
						id: permission.id,
						key: permission.key,
						name: permission.name,
						updatedAt: permission.updatedAt,
					});
				}),
				updatedAt: group.updatedAt,
			});
		});
	}

	public async findByKey(key: string): Promise<GroupEntity | null> {
		const groupByKey = await this.groupModel
			.query()
			.withGraphJoined(RelationName.PERMISSIONS)
			.findOne(`${RelationName.GROUPS}.key`, key)
			.execute();

		return groupByKey
			? GroupEntity.initialize({
					createdAt: groupByKey.createdAt,
					id: groupByKey.id,
					key: groupByKey.key,
					name: groupByKey.name,
					permissions: groupByKey.permissions.map((permission) => {
						return PermissionEntity.initialize({
							createdAt: permission.createdAt,
							id: permission.id,
							key: permission.key,
							name: permission.name,
							updatedAt: permission.updatedAt,
						});
					}),
					updatedAt: groupByKey.updatedAt,
				})
			: null;
	}

	public async findByName(name: string): Promise<GroupEntity | null> {
		const groupByName = await this.groupModel
			.query()
			.withGraphJoined(RelationName.PERMISSIONS)
			.findOne(`${RelationName.GROUPS}.name`, name)
			.execute();

		return groupByName
			? GroupEntity.initialize({
					createdAt: groupByName.createdAt,
					id: groupByName.id,
					key: groupByName.key,
					name: groupByName.name,
					permissions: groupByName.permissions.map((permission) => {
						return PermissionEntity.initialize({
							createdAt: permission.createdAt,
							id: permission.id,
							key: permission.key,
							name: permission.name,
							updatedAt: permission.updatedAt,
						});
					}),
					updatedAt: groupByName.updatedAt,
				})
			: null;
	}

	public async findPermissionInGroup(
		groupId: number,
		permissionId: number,
	): Promise<PermissionEntity | null> {
		const permission = await this.groupModel
			.relatedQuery(RelationName.PERMISSIONS)
			.for(groupId)
			.findOne({ permissionId })
			.castTo<PermissionModel | null>()
			.execute();

		return permission
			? PermissionEntity.initialize({
					createdAt: permission.createdAt,
					id: permission.id,
					key: permission.key,
					name: permission.name,
					updatedAt: permission.updatedAt,
				})
			: null;
	}

	public async findUserInGroup(
		groupId: number,
		userId: number,
	): Promise<UserEntity | null> {
		const user = await this.userModel
			.query()
			.where({ id: userId })
			.whereExists(
				this.userModel.relatedQuery(RelationName.GROUPS).where({ groupId }),
			)
			.withGraphFetched(
				`[${RelationName.GROUPS}.${RelationName.PERMISSIONS}, ${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}]]`,
			)
			.first()
			.execute();

		return user
			? UserEntity.initialize({
					avatarUrl: user.userDetails.avatarFile?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					firstName: user.userDetails.firstName,
					groups: user.groups.map((group) => {
						return GroupEntity.initialize({
							createdAt: group.createdAt,
							id: group.id,
							key: group.key,
							name: group.name,
							permissions: group.permissions.map((permission) => {
								return PermissionEntity.initialize({
									createdAt: permission.createdAt,
									id: permission.id,
									key: permission.key,
									name: permission.name,
									updatedAt: permission.updatedAt,
								});
							}),
							updatedAt: group.updatedAt,
						});
					}),
					id: user.id,
					lastName: user.userDetails.lastName,
					nickname: user.userDetails.nickname,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					sex: user.userDetails.sex,
					subscription: user.userDetails.subscription
						? SubscriptionEntity.initialize({
								createdAt: user.userDetails.subscription.createdAt,
								expiresAt: user.userDetails.subscription.expiresAt,
								id: user.userDetails.subscription.id,
								updatedAt: user.userDetails.subscription.updatedAt,
							})
						: null,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async removePermissionFromGroup(
		groupId: number,
		permissionId: number,
	): Promise<PermissionEntity[]> {
		await this.groupModel
			.relatedQuery(RelationName.PERMISSIONS)
			.for(groupId)
			.unrelate()
			.where({ permissionId })
			.execute();

		const permissions = await this.groupModel
			.relatedQuery(RelationName.PERMISSIONS)
			.for(groupId)
			.castTo<PermissionModel[]>()
			.execute();

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

	public async removeUserFromGroup(
		groupId: number,
		userId: number,
	): Promise<GroupEntity[]> {
		await this.userModel
			.relatedQuery(RelationName.GROUPS)
			.for(userId)
			.unrelate()
			.where({ groupId })
			.execute();

		const groups = await this.groupModel
			.query()
			.withGraphJoined(`[${RelationName.USERS}, ${RelationName.PERMISSIONS}]`)
			.where(`${RelationName.USERS}.id`, userId)
			.execute();

		return groups.map((group) => {
			return GroupEntity.initialize({
				createdAt: group.createdAt,
				id: group.id,
				key: group.key,
				name: group.name,
				permissions: group.permissions.map((permission) => {
					return PermissionEntity.initialize({
						createdAt: permission.createdAt,
						id: permission.id,
						key: permission.key,
						name: permission.name,
						updatedAt: permission.updatedAt,
					});
				}),
				updatedAt: group.updatedAt,
			});
		});
	}

	public async update(id: number, entity: GroupEntity): Promise<GroupEntity> {
		const { key, name } = entity.toNewObject();
		const updatedGroup = await this.groupModel
			.query()
			.where(`${RelationName.GROUPS}.id`, id)
			.updateAndFetchById(id, { key, name })
			.withGraphFetched(RelationName.PERMISSIONS);

		return GroupEntity.initialize({
			createdAt: updatedGroup.createdAt,
			id: updatedGroup.id,
			key: updatedGroup.key,
			name: updatedGroup.name,
			permissions: updatedGroup.permissions.map((permission) => {
				return PermissionEntity.initialize({
					createdAt: permission.createdAt,
					id: permission.id,
					key: permission.key,
					name: permission.name,
					updatedAt: permission.updatedAt,
				});
			}),
			updatedAt: updatedGroup.updatedAt,
		});
	}
}

export { GroupRepository };
