import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { CourseEntity, CourseModel } from "~/modules/courses/courses.js";
import { UserModel } from "~/modules/users/user.model.js";
import { VendorEntity } from "~/modules/vendors/vendors.js";

class UserCourseRepository implements Repository<CourseEntity> {
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	private modelToEntity(courseModel: CourseModel): CourseEntity {
		const {
			createdAt,
			description,
			id,
			image,
			title,
			updatedAt,
			url,
			vendor,
			vendorCourseId,
			vendorId,
		} = courseModel;

		return CourseEntity.initialize({
			createdAt,
			description,
			id,
			image,
			title,
			updatedAt,
			url,
			vendor: VendorEntity.initialize({
				createdAt: vendor.createdAt,
				id: vendor.id,
				key: vendor.key,
				name: vendor.name,
				updatedAt: vendor.updatedAt,
			}),
			vendorCourseId,
			vendorId,
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
