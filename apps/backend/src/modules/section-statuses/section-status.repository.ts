import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { RelationName } from "./libs/enums/enums.js";
import { type SectionStatusGetAllRequestDto } from "./libs/types/types.js";
import { SectionStatusEntity } from "./section-status.entity.js";
import { type SectionStatusModel } from "./section-status.model.js";

class SectionStatusRepository implements Repository<SectionStatusEntity> {
	private sectionStatusModel: typeof SectionStatusModel;

	public constructor(sectionStatusModel: typeof SectionStatusModel) {
		this.sectionStatusModel = sectionStatusModel;
	}

	public async create(
		courseSection: SectionStatusEntity,
	): Promise<SectionStatusEntity> {
		const sectionStatusModel = await this.sectionStatusModel
			.query()
			.insert(courseSection.toNewObject())
			.returning("*")
			.execute();

		return SectionStatusEntity.initialize({
			courseSectionId: sectionStatusModel.courseSectionId,
			createdAt: sectionStatusModel.createdAt,
			id: sectionStatusModel.id,
			status: sectionStatusModel.status,
			updatedAt: sectionStatusModel.updatedAt,
			userId: sectionStatusModel.userId,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedItemsCount = await this.sectionStatusModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async find(id: number): Promise<SectionStatusEntity | null> {
		const sectionStatusModel = await this.sectionStatusModel
			.query()
			.findById(id)
			.execute();

		if (!sectionStatusModel) {
			return null;
		}

		return SectionStatusEntity.initialize({
			courseSectionId: sectionStatusModel.courseSectionId,
			createdAt: sectionStatusModel.createdAt,
			id: sectionStatusModel.id,
			status: sectionStatusModel.status,
			updatedAt: sectionStatusModel.updatedAt,
			userId: sectionStatusModel.userId,
		});
	}

	public async findAll(): Promise<SectionStatusEntity[]> {
		const sectionStatusModels = await this.sectionStatusModel.query().execute();

		return sectionStatusModels.map((sectionStatusModel) => {
			return SectionStatusEntity.initialize({
				courseSectionId: sectionStatusModel.courseSectionId,
				createdAt: sectionStatusModel.createdAt,
				id: sectionStatusModel.id,
				status: sectionStatusModel.status,
				updatedAt: sectionStatusModel.updatedAt,
				userId: sectionStatusModel.userId,
			});
		});
	}

	public async findAllByCourseIdAndUserId({
		courseId,
		userId,
	}: SectionStatusGetAllRequestDto): Promise<SectionStatusEntity[]> {
		const sectionStatusModels = await this.sectionStatusModel
			.query()
			.whereIn("courseSectionId", function () {
				void this.select("id")
					.from(DatabaseTableName.COURSE_SECTIONS)
					.where("courseId", courseId);
			})
			.andWhere("userId", userId)
			.withGraphFetched(RelationName.COURSE_SECTIONS)
			.execute();

		return sectionStatusModels.map((sectionStatusModel) => {
			return SectionStatusEntity.initialize({
				courseSectionId: sectionStatusModel.courseSectionId,
				createdAt: sectionStatusModel.createdAt,
				id: sectionStatusModel.id,
				status: sectionStatusModel.status,
				updatedAt: sectionStatusModel.updatedAt,
				userId: sectionStatusModel.userId,
			});
		});
	}

	public async update(
		id: number,
		entity: SectionStatusEntity,
	): Promise<SectionStatusEntity> {
		const sectionStatus = entity.toNewObject();
		const sectionStatusModel = await this.sectionStatusModel
			.query()
			.patchAndFetchById(id, sectionStatus)
			.returning("*")
			.execute();

		return SectionStatusEntity.initialize({
			courseSectionId: sectionStatusModel.courseSectionId,
			createdAt: sectionStatusModel.createdAt,
			id: sectionStatusModel.id,
			status: sectionStatusModel.status,
			updatedAt: sectionStatusModel.updatedAt,
			userId: sectionStatusModel.userId,
		});
	}
}

export { SectionStatusRepository };
