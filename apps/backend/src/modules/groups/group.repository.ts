import { type Repository } from "~/libs/types/repository.type.js";
import { GroupEntity } from "./group.entity.js";
import { type GroupModel } from "./group.model.js";

class GroupRepository implements Repository<GroupEntity> {
	private groupModel: typeof GroupModel;

	public constructor(groupModel: typeof GroupModel) {
		this.groupModel = groupModel;
	}

	public async create(group: GroupEntity): Promise<GroupEntity> {
		const { key, name } = group.toNewObject();
		const createdGroup = await this.groupModel
			.query()
			.insert({ key, name })
			.returning("*")
			.execute();

		return GroupEntity.initialize({
			createdAt: createdGroup.createdAt,
			id: createdGroup.id,
			key: createdGroup.key,
			name: createdGroup.name,
			updatedAt: createdGroup.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedGroup = await this.groupModel.query().deleteById(id).execute();

		return Boolean(deletedGroup);
	}

	public async find(id: number): Promise<GroupEntity | null> {
		const groupById = await this.groupModel.query().findById(id).execute();

		return groupById
			? GroupEntity.initialize({
					createdAt: groupById.createdAt,
					id: groupById.id,
					key: groupById.key,
					name: groupById.name,
					updatedAt: groupById.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<GroupEntity[]> {
		const groups = await this.groupModel.query().execute();

		return groups.map((group) => {
			return GroupEntity.initialize({
				createdAt: group.createdAt,
				id: group.id,
				key: group.key,
				name: group.name,
				updatedAt: group.updatedAt,
			});
		});
	}

	public async update(id: number, entity: GroupEntity): Promise<GroupEntity> {
		const { key, name } = entity.toNewObject();
		const updatedGroup = await this.groupModel
			.query()
			.updateAndFetchById(id, { key, name });

		return GroupEntity.initialize({
			createdAt: updatedGroup.createdAt,
			id: updatedGroup.id,
			key: updatedGroup.key,
			name: updatedGroup.name,
			updatedAt: updatedGroup.updatedAt,
		});
	}
}

export { GroupRepository };
