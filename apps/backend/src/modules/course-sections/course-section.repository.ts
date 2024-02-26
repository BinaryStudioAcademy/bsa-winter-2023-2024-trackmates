import { type Repository } from "~/libs/types/types.js";

import { CourseSectionEntity } from "./course-section.entity.js";
import { type CourseSectionModel } from "./course-section.model.js";

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

		return courseSection
			? CourseSectionEntity.initialize({
					courseId: courseSection.courseId,
					createdAt: courseSection.createdAt,
					description: courseSection.description,
					id: courseSection.id,
					title: courseSection.title,
					updatedAt: courseSection.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<CourseSectionEntity[]> {
		const courseSections = await this.courseSectionModel.query().execute();

		return courseSections.map((courseSection) => {
			return CourseSectionEntity.initialize({
				courseId: courseSection.courseId,
				createdAt: courseSection.createdAt,
				description: courseSection.description,
				id: courseSection.id,
				title: courseSection.title,
				updatedAt: courseSection.updatedAt,
			});
		});
	}

	public async findCourseSections(
		courseId: number,
	): Promise<CourseSectionEntity[]> {
		const courseSections = await this.courseSectionModel
			.query()
			.where("courseId", courseId)
			.execute();

		return courseSections.map((courseSection) => {
			return CourseSectionEntity.initialize({
				courseId: courseSection.courseId,
				createdAt: courseSection.createdAt,
				description: courseSection.description,
				id: courseSection.id,
				title: courseSection.title,
				updatedAt: courseSection.updatedAt,
			});
		});
	}

	public async update(
		id: number,
		entity: CourseSectionEntity,
	): Promise<CourseSectionEntity | null> {
		const courseSection = entity.toObject();
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
			title: courseSectionModel.title,
			updatedAt: courseSectionModel.updatedAt,
		});
	}
}

export { CourseSectionRepository };
