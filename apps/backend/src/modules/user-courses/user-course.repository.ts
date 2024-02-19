import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";
import { Repository } from "~/libs/types/types.js";

import { CourseEntity } from "../courses/course.entity.js";
import { CourseModel } from "../courses/course.model.js";
import { UserModel } from "../users/user.model.js";
import { VendorEntity } from "../vendors/vendor.entity.js";

class UserCourseRepository implements Repository<CourseEntity> {
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	private modelToEntity(courseModel: CourseModel): CourseEntity {
		return CourseEntity.initialize({
			createdAt: courseModel.createdAt,
			description: courseModel.description,
			id: courseModel.id,
			image: courseModel.image,
			imageSmall: courseModel.imageSmall,
			title: courseModel.title,
			updatedAt: courseModel.updatedAt,
			url: courseModel.url,
			vendor: VendorEntity.initialize(courseModel.vendor),
			vendorCourseId: courseModel.vendorCourseId,
			vendorId: courseModel.vendorId,
		});
	}

	public create(entity: CourseEntity): Promise<CourseEntity> {
		return Promise.resolve(entity);
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

	public async findByUserId(userId: number): Promise<CourseEntity[]> {
		const user = await this.userModel.query().findById(userId);

		if (!user) {
			throw new ApplicationError({
				message: `Not found user with id ${userId}`,
			});
		}

		const courseModels = await user
			.$relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.withGraphFetched("vendor")
			.castTo<CourseModel[]>();

		return courseModels.map((model) => this.modelToEntity(model));
	}

	public update(): Promise<CourseEntity | null> {
		return Promise.resolve(null);
	}
}

export { UserCourseRepository };
