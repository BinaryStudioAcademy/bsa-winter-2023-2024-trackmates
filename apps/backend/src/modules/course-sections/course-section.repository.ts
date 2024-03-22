import { type Repository } from "~/libs/types/types.js";
import { CourseEntity } from "~/modules/courses/course.entity.js";
import { type CourseModel } from "~/modules/courses/courses.js";
import { VendorEntity } from "~/modules/vendors/vendor.entity.js";

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
			course: null,
			courseId: courseSectionModel.courseId,
			createdAt: courseSectionModel.createdAt,
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
			.withGraphFetched("course.vendor")
			.execute();

		if (!courseSection) {
			return null;
		}

		const course = courseSection.course as CourseModel;

		return CourseSectionEntity.initialize({
			course: CourseEntity.initialize({
				createdAt: course.createdAt,
				description: course.description,
				id: course.id,
				image: course.image,
				title: course.title,
				updatedAt: course.updatedAt,
				url: course.url,
				vendor: VendorEntity.initialize({
					createdAt: course.vendor.createdAt,
					id: course.vendor.id,
					key: course.vendor.key,
					name: course.vendor.name,
					updatedAt: course.vendor.updatedAt,
					url: course.vendor.url,
				}),
				vendorCourseId: course.vendorCourseId,
				vendorId: course.vendorId,
			}),
			courseId: courseSection.courseId,
			createdAt: courseSection.createdAt,
			id: courseSection.id,
			title: courseSection.title,
			updatedAt: courseSection.updatedAt,
		});
	}

	public async findAll(): Promise<{ items: CourseSectionEntity[] }> {
		const courseSections = await this.courseSectionModel.query().execute();

		return {
			items: courseSections.map((courseSection) => {
				return CourseSectionEntity.initialize({
					course: null,
					courseId: courseSection.courseId,
					createdAt: courseSection.createdAt,
					id: courseSection.id,
					title: courseSection.title,
					updatedAt: courseSection.updatedAt,
				});
			}),
		};
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
				course: null,
				courseId: courseSection.courseId,
				createdAt: courseSection.createdAt,
				id: courseSection.id,
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
			course: null,
			courseId: courseSectionModel.courseId,
			createdAt: courseSectionModel.createdAt,
			id: courseSectionModel.id,
			title: courseSectionModel.title,
			updatedAt: courseSectionModel.updatedAt,
		});
	}
}

export { CourseSectionRepository };
