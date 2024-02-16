import { Repository } from "~/libs/types/types.js";

import { VendorModel } from "../vendors/vendor.model.js";
import { CourseEntity } from "./course.entity.js";
import { CourseModel } from "./course.model.js";

class CourseRepository implements Repository<CourseEntity> {
	private courseModel: typeof CourseModel;
	private vendorModel: typeof VendorModel;

	public constructor(
		courseModel: typeof CourseModel,
		vendorModel: typeof VendorModel,
	) {
		this.courseModel = courseModel;
		this.vendorModel = vendorModel;
	}

	public async create(entity: CourseEntity): Promise<CourseEntity> {
		const { description, title, url, vendorId } = entity.toNewObject();

		const course = await this.courseModel
			.query()
			.insert({ description, title, url, vendorId })
			.returning("*")
			.execute();

		return CourseEntity.initialize({
			createdAt: course.createdAt,
			description: course.description,
			id: course.id,
			title: course.title,
			updatedAt: course.updatedAt,
			url: course.url,
			vendorId: course.vendorId,
		});
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

	public update(): Promise<CourseEntity | null> {
		return Promise.resolve(null);
	}
}

export { CourseRepository };
