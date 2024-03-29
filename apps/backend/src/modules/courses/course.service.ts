import { HTTPCode } from "~/libs/enums/enums.js";
import { convertPageToZeroIndexed } from "~/libs/helpers/helpers.js";
import { type OpenAI } from "~/libs/modules/open-ai/open-ai.js";
import {
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import {
	CourseSectionEntity,
	type CourseSectionRepository,
} from "~/modules/course-sections/course-sections.js";
import {
	type VendorApi,
	type VendorResponseDto,
	type VendorService,
} from "~/modules/vendors/vendors.js";

import { CourseEntity } from "./course.entity.js";
import { type CourseRepository } from "./course.repository.js";
import { CourseErrorMessage } from "./libs/enums/enums.js";
import { CourseError } from "./libs/exceptions/exceptions.js";
import {
	type CourseDto,
	type CourseSearchGetAllResponseDto,
	type CourseSearchResponseDto,
	type CourseUpdateRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	courseRepository: CourseRepository;
	courseSectionRepository: CourseSectionRepository;
	openAI: OpenAI;
	vendorService: VendorService;
	vendorsApiMap: Record<string, VendorApi>;
};

class CourseService {
	private courseRepository: CourseRepository;
	private courseSectionRepository: CourseSectionRepository;
	private openAI: OpenAI;
	private vendorService: VendorService;
	private vendorsApiMap: Record<string, VendorApi>;

	public constructor({
		courseRepository,
		courseSectionRepository,
		openAI,
		vendorService,
		vendorsApiMap,
	}: Constructor) {
		this.courseRepository = courseRepository;
		this.courseSectionRepository = courseSectionRepository;
		this.openAI = openAI;
		this.vendorsApiMap = vendorsApiMap;
		this.vendorService = vendorService;
	}

	private async addSectionsToCourse(
		course: CourseEntity,
	): Promise<CourseSectionEntity[]> {
		const sections = await this.getVendorCourseSections(course);

		for (const section of sections) {
			await this.courseSectionRepository.create(section);
		}

		return sections;
	}

	private async getVendorApiById(vendorId: number): Promise<VendorApi> {
		const vendor = await this.vendorService.findById(vendorId);

		if (!vendor) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_VENDOR,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return this.getVendorApiByKey(vendor.key);
	}

	private getVendorApiByKey(vendorKey: string): VendorApi {
		const vendorModule = this.vendorsApiMap[vendorKey];

		if (!vendorModule) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_API_FOR_VENDOR,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return vendorModule;
	}

	private async getVendorCourse(
		vendorCourseId: string,
		vendorId: number,
	): Promise<CourseEntity> {
		const vendorApi = await this.getVendorApiById(vendorId);
		const course = await vendorApi.getCourseById(vendorCourseId);

		return CourseEntity.initializeNew({
			description: course.description,
			image: course.image,
			title: course.title,
			url: course.url,
			vendorCourseId: course.vendorCourseId,
			vendorId,
		});
	}

	private async getVendorCourseSections(
		course: CourseEntity,
	): Promise<CourseSectionEntity[]> {
		const { id, vendorCourseId, vendorId } = course.toObject();
		const vendorApi = await this.getVendorApiById(vendorId);
		const sections = await vendorApi.getCourseSections(vendorCourseId);

		return sections.map((section) => {
			return CourseSectionEntity.initializeNew({
				courseId: id,
				title: section.title,
			});
		});
	}

	private async mapCoursesToCoursesWithOwnership(
		courses: CourseDto[],
		userId: number,
	): Promise<CourseSearchResponseDto[]> {
		const userCourses = await this.courseRepository.findByUserId({
			search: "",
			userId,
		});
		const userCoursesIds = new Set(
			userCourses.map((course) => course.toNewObject().vendorCourseId),
		);

		return courses.map((course) => {
			return {
				...course,
				hasUserCourse: userCoursesIds.has(course.vendorCourseId.toString()),
			};
		});
	}

	public async addCourse({
		userId,
		vendorCourseId,
		vendorId,
	}: {
		userId: number;
		vendorCourseId: string;
		vendorId: number;
	}): Promise<CourseDto> {
		const vendorCourse = await this.getVendorCourse(vendorCourseId, vendorId);
		const existingCourse =
			await this.courseRepository.findByVendorCourseId(vendorCourseId);

		if (!existingCourse) {
			const createdCourse =
				await this.courseRepository.createCourseWithRelation(
					vendorCourse,
					userId,
				);
			await this.addSectionsToCourse(createdCourse);

			return createdCourse.toObject();
		}

		await this.courseRepository.createRelationWithUser(existingCourse, userId);

		return existingCourse.toObject();
	}

	public async create({
		vendorCourseId,
		vendorId,
	}: {
		vendorCourseId: string;
		vendorId: number;
	}): Promise<CourseDto> {
		const existingCourse =
			await this.courseRepository.findByVendorCourseId(vendorCourseId);

		if (existingCourse) {
			throw new CourseError({
				message: CourseErrorMessage.COURSE_IS_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const vendorCourse = await this.getVendorCourse(vendorCourseId, vendorId);
		const addedCourse = await this.courseRepository.create(vendorCourse);

		await this.addSectionsToCourse(addedCourse);

		return addedCourse.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const courseById = await this.courseRepository.find(id);

		if (!courseById) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_COURSE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return await this.courseRepository.delete(id);
	}

	public async find(id: number): Promise<CourseDto> {
		const entity = await this.courseRepository.find(id);

		if (!entity) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_COURSE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return entity.toObject();
	}

	public async findAll({
		count,
		page,
	}: PaginationRequestDto): Promise<PaginationResponseDto<CourseDto>> {
		const { items: courses, total } = await this.courseRepository.findAll({
			count,
			page: convertPageToZeroIndexed(page),
		});

		return {
			items: courses.map((entity) => ({
				...entity.toObject(),
				hasUserCourse: false,
			})),
			total,
		};
	}

	public async findAllByVendor(
		page: number,
		search: string,
		vendor: VendorResponseDto,
	): Promise<CourseDto[]> {
		const vendorApi = this.getVendorApiByKey(vendor.key);
		const items = await vendorApi.getCourses(page, search);

		return items.map((item) => ({ ...item, id: null, vendor }));
	}

	public async findAllByVendors(parameters: {
		page: number;
		search: string;
		userId: number;
		vendorsKey: string | undefined;
	}): Promise<CourseSearchGetAllResponseDto> {
		const { page, search, userId, vendorsKey } = parameters;
		const vendors = vendorsKey
			? await this.vendorService.findAllByKeys(vendorsKey.split(","))
			: await this.vendorService.findAll();

		const vendorsCourses = await Promise.all(
			vendors.map((vendor) => {
				return this.findAllByVendor(page, search, vendor);
			}),
		);
		const courses = vendorsCourses.flat();

		const coursesWithOwnership = await this.mapCoursesToCoursesWithOwnership(
			courses,
			userId,
		);

		return { courses: coursesWithOwnership };
	}

	public async getRecommendedCoursesByAI(parameters: {
		page: number;
		search: string;
		userId: number;
		vendorsKey: string | undefined;
	}): Promise<CourseSearchGetAllResponseDto> {
		const { courses } = await this.findAllByVendors(parameters);

		const prompt =
			"Given a list of courses in JSON format. Analyze these courses by all fields. Return an array with the first four indexes of sorted courses based on their overall quality and interest level, from the most recommended courses to the least. The answer should be without any explanation in the format: [index]. The index starts with 0. For example: if the input data to analyze is [{0}, {1}, {2}, {3}, {4}], and the first four sorted indexes are 1, 2, 0, and 3, then the output should be like: [1, 2, 0, 3]. Please ensure that the returned array contains only the indexes of the first four sorted courses.";
		const request = `${prompt}\n\n${JSON.stringify(courses)}`;
		const response = await this.openAI.call(request);
		const sortedIndexes = JSON.parse(response) as number[];

		const sortedCourses = sortedIndexes.map((index) => {
			return courses[index] as CourseSearchResponseDto;
		});

		return { courses: sortedCourses.filter(Boolean) };
	}

	public async update(
		id: number,
		payload: CourseUpdateRequestDto,
	): Promise<CourseDto> {
		const courseById = await this.courseRepository.find(id);

		if (!courseById) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_COURSE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const existingCourse = courseById.toObject();

		const updatedCourse = await this.courseRepository.update(
			id,
			CourseEntity.initializeNew({
				description: existingCourse.description,
				image: existingCourse.image,
				title: payload.title,
				url: existingCourse.url,
				vendorCourseId: existingCourse.vendorCourseId,
				vendorId: existingCourse.vendorId,
			}),
		);

		if (!updatedCourse) {
			throw new CourseError({
				message: CourseErrorMessage.COURSE_UPDATE_FAILED,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return updatedCourse.toObject();
	}

	public async updateFromVendor(id: number): Promise<CourseDto | null> {
		const existingCourse = await this.courseRepository.find(id);

		if (!existingCourse) {
			throw new CourseError({
				message: CourseErrorMessage.NOT_FOUND_COURSE,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { vendorCourseId, vendorId } = existingCourse.toObject();
		const vendorCourse = await this.getVendorCourse(vendorCourseId, vendorId);
		const course = await this.courseRepository.update(id, vendorCourse);

		return course ? course.toObject() : null;
	}
}

export { CourseService };
