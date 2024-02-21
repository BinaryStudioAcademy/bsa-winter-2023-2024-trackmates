import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { DatabaseTableName } from "~/libs/modules/database/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { UserModel } from "../users/user.model.js";
import { VendorEntity } from "../vendors/vendors.js";
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

	private async createCourseWithRelation(
		courseEntity: CourseEntity,
		userId: number,
	): Promise<CourseEntity> {
		const courseModel = await this.userModel
			.relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.insert(courseEntity.toNewObject())
			.returning("*")
			.withGraphFetched("vendor")
			.castTo<CourseModel>()
			.execute();

		return this.modelToEntity(courseModel);
	}

	private async createRelationWithUser(
		courseEntity: CourseEntity,
		userId: number,
	) {
		const course = courseEntity.toObject();
		const isCourseRelatedWithUser = !!(await this.userModel
			.relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.findOne("vendorCourseId", course.vendorCourseId));

		if (isCourseRelatedWithUser) {
			throw new ApplicationError({
				message: `Course "${course.title}" was already added for user`,
			});
		}

		await this.userModel
			.relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.relate(course.id)
			.returning("*")
			.execute();
	}

	private modelToEntity(courseModel: CourseModel): CourseEntity {
		const {
			createdAt,
			description,
			id,
			image,
			imageSmall,
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
			imageSmall,
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

	public async addCourseToUser(
		entity: CourseEntity,
		userId: number,
	): Promise<CourseEntity> {
		const course = entity.toNewObject();
		const existedCourseEntity = await this.findByVendorCourseId(
			course.vendorCourseId,
		);

		if (!existedCourseEntity) {
			return await this.createCourseWithRelation(entity, userId);
		}

		await this.createRelationWithUser(existedCourseEntity, userId);

		return existedCourseEntity;
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

	public async findByVendorCourseId(
		vendorCourseId: string,
	): Promise<CourseEntity | null> {
		const course = await this.courseModel
			.query()
			.withGraphFetched("vendor")
			.findOne("vendorCourseId", vendorCourseId)
			.execute();
		return course ? this.modelToEntity(course) : null;
	}

	public update(): Promise<CourseEntity | null> {
		return Promise.resolve(null);
	}
}

export { CourseRepository };
