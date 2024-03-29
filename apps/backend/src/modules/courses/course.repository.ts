import { type UserCourseResponseDto } from "@trackmates/shared";
import { raw } from "objection";
import { type Page } from "objection";

import { SortOrder } from "~/libs/enums/enums.js";
import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { type UserModel } from "~/modules/users/user.model.js";
import { VendorEntity } from "~/modules/vendors/vendors.js";

import { CourseSectionModel } from "../course-sections/course-sections.js";
import { CourseEntity } from "./course.entity.js";
import { type CourseModel } from "./course.model.js";
import { NO_PROGRESS_ON_USER_COURSE } from "./libs/constants/constants.js";
import { CourseErrorMessage } from "./libs/enums/enums.js";
import { CourseError } from "./libs/exceptions/exceptions.js";
import {
	type CourseGetAllByUserRequestDto,
	type ProgressDataItem,
} from "./libs/types/types.js";

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

	public async create(course: CourseEntity): Promise<CourseEntity> {
		const courseModel = await this.courseModel
			.query()
			.insert(course.toNewObject())
			.returning("*")
			.withGraphFetched("vendor")
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

	public async createCourseWithRelation(
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

	public async createRelationWithUser(
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

	public async findAll({
		count,
		page,
	}: PaginationRequestDto): Promise<PaginationResponseDto<CourseEntity>> {
		const { results: courses, total } = await this.courseModel
			.query()
			.withGraphFetched("vendor")
			.orderBy("id", SortOrder.ASC)
			.page(page, count)
			.execute();

		return {
			items: courses.map((course) => {
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
			}),
			total,
		};
	}

	public async findAllByUser({
		count,
		page,
		search,
		userId,
	}: CourseGetAllByUserRequestDto): Promise<
		PaginationResponseDto<UserCourseResponseDto>
	> {
		const user = await this.userModel.query().findById(userId);

		if (!user) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_USER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { results, total } = await user
			.$relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.whereILike("title", `%${search}%`)
			.withGraphFetched("vendor")
			.orderBy("courses.updatedAt", SortOrder.ASC)
			.page(page, count)
			.castTo<Page<CourseModel>>();

		const progressData = await this.getProgressData(
			results.map((course) => course.id),
			userId,
		);

		return {
			items: results.map((course) => {
				const progressItem = progressData.find((p) => p.courseId === course.id);

				return {
					createdAt: course.createdAt,
					description: course.description,
					id: course.id,
					image: course.image,
					progress: progressItem?.progress ?? NO_PROGRESS_ON_USER_COURSE,
					title: course.title,
					updatedAt: course.updatedAt,
					url: course.url,
					vendor: course.vendor,
					vendorCourseId: course.vendorCourseId,
					vendorId: course.vendorId,
				};
			}),
			total,
		};
	}

	public async findByUserId({
		search,
		userId,
	}: {
		search: string;
		userId: number;
	}): Promise<CourseEntity[]> {
		const user = await this.userModel.query().findById(userId);

		if (!user) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_USER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const courseModels = await user
			.$relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.whereILike("title", `%${search}%`)
			.withGraphFetched("vendor")
			.castTo<CourseModel[]>();

		return courseModels.map((model) =>
			CourseEntity.initialize({
				createdAt: model.createdAt,
				description: model.description,
				id: model.id,
				image: model.image,
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

	public async findCommonCourses(
		userId: number,
		currentUserId: number,
	): Promise<CourseEntity[]> {
		const user = await this.userModel.query().findById(userId);

		if (!user) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_USER,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const courseModels = await user
			.$relatedQuery(DatabaseTableName.COURSES)
			.for(userId)
			.whereIn(
				"courses.id",
				this.userModel
					.relatedQuery(DatabaseTableName.COURSES)
					.for(currentUserId)
					.select("courses.id as course_id"),
			)
			.withGraphFetched("vendor")
			.castTo<CourseModel[]>();

		return courseModels.map((model) =>
			CourseEntity.initialize({
				createdAt: model.createdAt,
				description: model.description,
				id: model.id,
				image: model.image,
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

	public async getProgressData(
		courseIds: number[],
		userId: number,
	): Promise<ProgressDataItem[]> {
		return await CourseSectionModel.query()
			.select(`${DatabaseTableName.COURSE_SECTIONS}.course_id`)
			.select(
				raw(`
						ROUND(
							(count(distinct CASE WHEN ${DatabaseTableName.SECTION_STATUSES}.status = 'completed' THEN ${DatabaseTableName.COURSE_SECTIONS}.id END)::float
								/
							count(distinct ${DatabaseTableName.COURSE_SECTIONS}.id)::float) * 100
							) as progress
				`),
			)
			.leftJoin(DatabaseTableName.SECTION_STATUSES, (joinClause) => {
				joinClause
					.on(
						`${DatabaseTableName.SECTION_STATUSES}.course_section_id`,
						`${DatabaseTableName.COURSE_SECTIONS}.id`,
					)
					.andOnVal(
						`${DatabaseTableName.SECTION_STATUSES}.userId`,
						"=",
						userId,
					);
			})
			.whereIn(`${DatabaseTableName.COURSE_SECTIONS}.course_id`, courseIds)
			.groupBy(`${DatabaseTableName.COURSE_SECTIONS}.course_id`)
			.castTo<ProgressDataItem[]>();
	}

	public async update(
		id: number,
		entity: CourseEntity,
	): Promise<CourseEntity | null> {
		const course = entity.toNewObject();
		const courseModel = await this.courseModel
			.query()
			.updateAndFetchById(id, course)
			.withGraphFetched("vendor")
			.castTo<CourseModel | undefined>()
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
}

export { CourseRepository };
