import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";
import { Repository } from "~/libs/types/types.js";

import { UserModel } from "../users/user.model.js";
import { CourseEntity } from "./course.entity.js";
import { CourseModel } from "./course.model.js";

class CourseRepository implements Repository<CourseEntity> {
	private courseModel: typeof CourseModel;
	private userModel: typeof UserModel;

	public constructor(
		courseModel: typeof CourseModel,
		userModel: typeof UserModel,
	) {
		this.courseModel = courseModel;
		this.userModel = userModel;
	}

	public async addCourse(userId: number, entity: CourseEntity) {
		const course = entity.toNewObject();
		const existedEntity = await this.findByVendorCourseId(
			course.vendorCourseId,
		);

		if (!existedEntity) {
			return await this.userModel
				.relatedQuery(DatabaseTableName.COURSES)
				.for(userId)
				.insert(course)
				.returning("*")
				.execute();
		}

		const existedCourse = existedEntity.toObject();
		await this.userModel
			.relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.relate(existedCourse.id)
			.execute();

		return existedCourse;
	}

	public async create(entity: CourseEntity): Promise<CourseEntity> {
		const course = await this.courseModel
			.query()
			.insert(entity.toNewObject())
			.returning("*")
			.execute();

		return CourseEntity.initialize(course);

		// return CourseEntity.initialize({
		// 	createdAt: course.createdAt,
		// 	description: course.description,
		// 	id: course.id,
		// 	image: course.image,
		// 	imageSmall: course.imageSmall,
		// 	title: course.title,
		// 	updatedAt: course.updatedAt,
		// 	url: course.url,
		// 	vendorCourseId: course.vendorCourseId,
		// 	vendorId: course.vendorId,
		// });
	}

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<CourseEntity | null> {
		return Promise.resolve(null);
	}

	public findAll(): Promise<CourseEntity[]> {
		return Promise.resolve([]);
	}

	public async findByVendorCourseId(
		vendorCourseId: string,
	): Promise<CourseEntity | null> {
		const course = await this.courseModel
			.query()
			.findOne("vendorCourseId", vendorCourseId)
			.execute();
		return course ? CourseEntity.initialize(course) : null;
	}

	public update(): Promise<CourseEntity | null> {
		return Promise.resolve(null);
	}
}

export { CourseRepository };
