import { type Repository } from "~/libs/types/types.js";
import { SectionStatusEntity } from "~/modules/section-statuses/section-statuses.js";
import { type SectionStatusModel } from "~/modules/section-statuses/section-statuses.js";

import { CourseSectionEntity } from "./course-section.entity.js";
import { type CourseSectionModel } from "./course-section.model.js";
import { type CourseSectionGetAllRequestDto } from "./libs/types/types.js";

class CourseSectionRepository implements Repository<CourseSectionEntity> {
	private courseSectionModel: typeof CourseSectionModel;

	public constructor(courseSectionModel: typeof CourseSectionModel) {
		this.courseSectionModel = courseSectionModel;
	}

	public async create(
		courseSection: CourseSectionEntity,
	): Promise<CourseSectionEntity> {
		const courseSectionModel = await this.courseSectionModel
			.query()
			.insert(courseSection.toNewObject())
			.returning("*")
			.castTo<CourseSectionModel>()
			.execute();

		return CourseSectionEntity.initialize({
			courseId: courseSectionModel.courseId,
			createdAt: courseSectionModel.createdAt,
			description: courseSectionModel.description,
			id: courseSectionModel.id,
			sectionStatus: null,
			title: courseSectionModel.title,
			updatedAt: courseSectionModel.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedItemsCount = await this.courseSectionModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedItemsCount);
	}

	public async find(id: number): Promise<CourseSectionEntity | null> {
		const courseSection = await this.courseSectionModel
			.query()
			.findById(id)
			.execute();

		if (!courseSection) {
			return null;
		}

		return CourseSectionEntity.initialize({
			courseId: courseSection.courseId,
			createdAt: courseSection.createdAt,
			description: courseSection.description,
			id: courseSection.id,
			sectionStatus: null,
			title: courseSection.title,
			updatedAt: courseSection.updatedAt,
		});
	}

	public async findAll(): Promise<CourseSectionEntity[]> {
		const courseSections = await this.courseSectionModel.query().execute();

		return courseSections.map((courseSection) => {
			return CourseSectionEntity.initialize({
				courseId: courseSection.courseId,
				createdAt: courseSection.createdAt,
				description: courseSection.description,
				id: courseSection.id,
				sectionStatus: null,
				title: courseSection.title,
				updatedAt: courseSection.updatedAt,
			});
		});
	}

	public async findCourseSections({
		courseId,
		userId,
	}: CourseSectionGetAllRequestDto): Promise<CourseSectionEntity[]> {
		const courseSections = await this.courseSectionModel
			.query()
			.where("courseId", courseId)
			.withGraphJoined("sectionStatus")
			.modifyGraph<SectionStatusModel>("sectionStatus", (builder) => {
				void builder.where({ userId });
			})
			.execute();

		return courseSections.map((courseSection) => {
			return CourseSectionEntity.initialize({
				courseId: courseSection.courseId,
				createdAt: courseSection.createdAt,
				description: courseSection.description,
				id: courseSection.id,
				sectionStatus: courseSection.sectionStatus
					? SectionStatusEntity.initialize({
							courseSectionId: courseSection.sectionStatus.courseSectionId,
							createdAt: courseSection.sectionStatus.createdAt,
							id: courseSection.sectionStatus.id,
							status: courseSection.sectionStatus.status,
							updatedAt: courseSection.sectionStatus.updatedAt,
							userId: courseSection.sectionStatus.userId,
						})
					: null,
				title: courseSection.title,
				updatedAt: courseSection.updatedAt,
			});
		});
	}

	public async update(
		id: number,
		entity: CourseSectionEntity,
	): Promise<CourseSectionEntity> {
		const courseSection = entity.toNewObject();
		const courseSectionModel = await this.courseSectionModel
			.query()
			.findById(id)
			.patch(courseSection)
			.returning("*")
			.castTo<CourseSectionModel>()
			.execute();

		return CourseSectionEntity.initialize({
			courseId: courseSectionModel.courseId,
			createdAt: courseSectionModel.createdAt,
			description: courseSectionModel.description,
			id: courseSectionModel.id,
			sectionStatus: null,
			title: courseSectionModel.title,
			updatedAt: courseSectionModel.updatedAt,
		});
	}
}

export { CourseSectionRepository };
