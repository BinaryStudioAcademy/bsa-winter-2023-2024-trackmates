import { raw } from "objection";

import { getPercentage } from "~/libs/helpers/helpers.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Repository } from "~/libs/types/types.js";
import { UserCourseEntity } from "~/modules/user-courses/user-course.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";
import { VendorEntity } from "~/modules/vendors/vendors.js";

import { CourseSectionModel } from "../course-sections/course-sections.js";
import { CourseEntity } from "./course.entity.js";
import { type CourseModel } from "./course.model.js";
import { NO_PROGRESS } from "./libs/constants/constants.js";
import { CourseErrorMessage } from "./libs/enums/enums.js";
import { CourseError } from "./libs/exceptions/exceptions.js";
import { type ProgressDataItem } from "./libs/types/types.js";

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

		return CourseEntity.initialize({
			createdAt: courseModel.createdAt,
			description: courseModel.description,
			id: courseModel.id,
			image: courseModel.image,
			title: courseModel.title,
			updatedAt: courseModel.updatedAt,
			url: courseModel.url,
			vendor: VendorEntity.initialize({
				createdAt: courseModel.vendor.createdAt,
				id: courseModel.vendor.id,
				key: courseModel.vendor.key,
				name: courseModel.vendor.name,
				updatedAt: courseModel.vendor.updatedAt,
				url: courseModel.vendor.url,
			}),
			vendorCourseId: courseModel.vendorCourseId,
			vendorId: courseModel.vendorId,
		});
	}

	private async createRelationWithUser(
		courseEntity: CourseEntity,
		userId: number,
	): Promise<void> {
		const course = courseEntity.toObject();
		const courseRelatedWithUser = await this.userModel
			.relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.findOne("vendorCourseId", course.vendorCourseId);

		const hasUserTheCourse = Boolean(courseRelatedWithUser);

		if (hasUserTheCourse) {
			throw new CourseError({
				message: CourseErrorMessage.COURSE_IS_ALREADY_ADDED_FOR_USER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		await this.userModel
			.relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.relate(course.id)
			.returning("*")
			.execute();
	}

	public async addCourseToUser(
		entity: CourseEntity,
		userId: number,
	): Promise<CourseEntity> {
		const course = entity.toNewObject();
		const existingCourse = await this.findByVendorCourseId(
			course.vendorCourseId,
		);

		if (!existingCourse) {
			return await this.createCourseWithRelation(entity, userId);
		}

		await this.createRelationWithUser(existingCourse, userId);

		return existingCourse;
	}

	public async create(course: CourseEntity): Promise<CourseEntity> {
		const courseModel = await this.courseModel
			.query()
			.insert(course.toNewObject())
			.returning("*")
			.withGraphFetched("vendor")
			.castTo<CourseModel>()
			.execute();

		return CourseEntity.initialize({
			createdAt: courseModel.createdAt,
			description: courseModel.description,
			id: courseModel.id,
			image: courseModel.image,
			title: courseModel.title,
			updatedAt: courseModel.updatedAt,
			url: courseModel.url,
			vendor: VendorEntity.initialize({
				createdAt: courseModel.vendor.createdAt,
				id: courseModel.vendor.id,
				key: courseModel.vendor.key,
				name: courseModel.vendor.name,
				updatedAt: courseModel.vendor.updatedAt,
				url: courseModel.vendor.url,
			}),
			vendorCourseId: courseModel.vendorCourseId,
			vendorId: courseModel.vendorId,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const itemsCount = await this.courseModel.query().deleteById(id).execute();

		return Boolean(itemsCount);
	}

	public async find(id: number): Promise<CourseEntity | null> {
		const courseModel = await this.courseModel
			.query()
			.findById(id)
			.withGraphFetched("vendor")
			.execute();

		return courseModel
			? CourseEntity.initialize({
					createdAt: courseModel.createdAt,
					description: courseModel.description,
					id: courseModel.id,
					image: courseModel.image,
					title: courseModel.title,
					updatedAt: courseModel.updatedAt,
					url: courseModel.url,
					vendor: VendorEntity.initialize({
						createdAt: courseModel.vendor.createdAt,
						id: courseModel.vendor.id,
						key: courseModel.vendor.key,
						name: courseModel.vendor.name,
						updatedAt: courseModel.vendor.updatedAt,
						url: courseModel.vendor.url,
					}),
					vendorCourseId: courseModel.vendorCourseId,
					vendorId: courseModel.vendorId,
				})
			: null;
	}

	public async findAll(): Promise<CourseEntity[]> {
		const courses = await this.courseModel
			.query()
			.withGraphFetched("vendor")
			.execute();

		return courses.map((course) => {
			return CourseEntity.initialize({
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
			});
		});
	}

	public async findByUserId({
		search,
		userId,
	}: {
		search: string;
		userId: number;
	}): Promise<UserCourseEntity[]> {
		const user = await this.userModel.query().findById(userId);

		if (!user) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_USER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const courses = await user
			.$relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.whereILike("title", `%${search}%`)
			.withGraphFetched("vendor")
			.castTo<CourseModel[]>();

		const progressData = (await CourseSectionModel.query()
			.select(`${DatabaseTableName.COURSE_SECTIONS}.course_id`)
			.countDistinct(
				`${DatabaseTableName.COURSE_SECTIONS}.id as total_sections`,
			)
			.select(
				raw(`
					count(distinct CASE WHEN ${DatabaseTableName.SECTION_STATUSES}.status = 'completed' THEN ${DatabaseTableName.COURSE_SECTIONS}.id END) as completed_sections
				`),
			)
			.leftJoin(
				DatabaseTableName.SECTION_STATUSES,
				`${DatabaseTableName.SECTION_STATUSES}.course_section_id`,
				`${DatabaseTableName.COURSE_SECTIONS}.id`,
			)
			.whereIn(
				`${DatabaseTableName.COURSE_SECTIONS}.course_id`,
				courses.map((course) => course.id),
			)
			.groupBy(
				`${DatabaseTableName.COURSE_SECTIONS}.course_id`,
			)) as unknown as ProgressDataItem[];

		const coursesWithProgress = courses.map((course) => {
			const progress = progressData.find((p) => p.courseId === course.id);

			const progressPercentage = progress
				? Math.round(
						getPercentage({
							part: progress.completedSections,
							total: progress.totalSections,
						}),
					)
				: NO_PROGRESS;

			return { ...course, progress: progressPercentage };
		});

		return coursesWithProgress.map((model) =>
			UserCourseEntity.initialize({
				createdAt: model.createdAt,
				description: model.description,
				id: model.id,
				image: model.image,
				progress: model.progress,
				title: model.title,
				updatedAt: model.updatedAt,
				url: model.url,
				vendor: VendorEntity.initialize({
					createdAt: model.vendor.createdAt,
					id: model.vendor.id,
					key: model.vendor.key,
					name: model.vendor.name,
					updatedAt: model.vendor.updatedAt,
					url: model.vendor.url,
				}),
				vendorCourseId: model.vendorCourseId,
				vendorId: model.vendorId,
			}),
		);
	}

	public async findByVendorCourseId(
		vendorCourseId: string,
	): Promise<CourseEntity | null> {
		const course = await this.courseModel
			.query()
			.withGraphFetched("vendor")
			.findOne("vendorCourseId", vendorCourseId)
			.execute();

		return course
			? CourseEntity.initialize({
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
				})
			: null;
	}

	public async update(
		id: number,
		entity: CourseEntity,
	): Promise<CourseEntity | null> {
		const course = entity.toNewObject();
		const courseModel = await this.courseModel
			.query()
			.findById(id)
			.patch(course)
			.returning("*")
			.castTo<CourseModel>()
			.execute();

		return courseModel.id
			? CourseEntity.initialize({
					createdAt: courseModel.createdAt,
					description: courseModel.description,
					id: courseModel.id,
					image: courseModel.image,
					title: courseModel.title,
					updatedAt: courseModel.updatedAt,
					url: courseModel.url,
					vendor: VendorEntity.initialize({
						createdAt: courseModel.vendor.createdAt,
						id: courseModel.vendor.id,
						key: courseModel.vendor.key,
						name: courseModel.vendor.name,
						updatedAt: courseModel.vendor.updatedAt,
						url: courseModel.vendor.url,
					}),
					vendorCourseId: courseModel.vendorCourseId,
					vendorId: courseModel.vendorId,
				})
			: null;
	}
}

export { CourseRepository };
