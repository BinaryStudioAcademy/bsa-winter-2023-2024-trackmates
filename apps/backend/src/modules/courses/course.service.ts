import { HTTPCode } from "~/libs/enums/enums.js";
import { type OpenAI } from "~/libs/modules/open-ai/open-ai.js";
import {
	CourseSectionEntity,
	type CourseSectionRepository,
} from "~/modules/course-sections/course-sections.js";
import { type SectionStatusRepository } from "~/modules/section-statuses/section-status.repository.js";
import {
	type VendorApi,
	type VendorResponseDto,
	type VendorService,
} from "~/modules/vendors/vendors.js";

import { CourseEntity } from "./course.entity.js";
import { type CourseRepository } from "./course.repository.js";
import { CourseErrorMessage } from "./libs/enums/enums.js";
import { CourseError } from "./libs/exceptions/exceptions.js";
import { type CourseDto, type CoursesResponseDto } from "./libs/types/types.js";

type Constructor = {
	courseRepository: CourseRepository;
	courseSectionRepository: CourseSectionRepository;
	openAI: OpenAI;
	sectionStatusRepository: SectionStatusRepository;
	vendorService: VendorService;
	vendorsApiMap: Record<string, VendorApi>;
};

class CourseService {
	private courseRepository: CourseRepository;
	private courseSectionRepository: CourseSectionRepository;
	private openAI: OpenAI;
	private sectionStatusRepository: SectionStatusRepository;
	private vendorService: VendorService;
	private vendorsApiMap: Record<string, VendorApi>;

	public constructor({
		courseRepository,
		courseSectionRepository,
		openAI,
		sectionStatusRepository,
		vendorService,
		vendorsApiMap,
	}: Constructor) {
		this.courseRepository = courseRepository;
		this.courseSectionRepository = courseSectionRepository;
		this.openAI = openAI;
		this.vendorsApiMap = vendorsApiMap;
		this.vendorService = vendorService;
		this.sectionStatusRepository = sectionStatusRepository;
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

	private async filterCourses(
		courses: CourseDto[],
		userId: number,
	): Promise<CourseDto[]> {
		const userCourses = await this.courseRepository.findByUserId({
			search: "",
			userId,
		});
		const userCoursesIds = new Set(
			userCourses.map((course) => course.toNewObject().vendorCourseId),
		);

		return courses.filter(({ vendorCourseId }) => {
			return !userCoursesIds.has(vendorCourseId.toString());
		});
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

		const addedCourse = await this.courseRepository.addCourseToUser(
			vendorCourse,
			userId,
		);

		await this.addSectionsToCourse(addedCourse);

		return addedCourse.toObject();
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

	public async findAll(): Promise<CourseDto[]> {
		const entities = await this.courseRepository.findAll();

		return entities.map((entity) => entity.toObject());
	}

	public async findAllByVendor(
		search: string,
		vendor: VendorResponseDto,
	): Promise<CourseDto[]> {
		const vendorApi = this.getVendorApiByKey(vendor.key);
		const items = await vendorApi.getCourses(search);

		return items.map((item) => ({ ...item, id: null, vendor }));
	}

	public async findAllByVendors(parameters: {
		search: string;
		userId: number;
		vendorsKey: string | undefined;
	}): Promise<CoursesResponseDto> {
		const { search, userId, vendorsKey } = parameters;
		const vendors = vendorsKey
			? await this.vendorService.findAllByKeys(vendorsKey.split(","))
			: await this.vendorService.findAll();

		const vendorsCourses = await Promise.all(
			vendors.map((vendor) => {
				return this.findAllByVendor(search, vendor);
			}),
		);
		let courses = vendorsCourses.flat();

		courses = await this.filterCourses(courses, userId);

		return { courses };
	}

	public async getRecommendedCoursesByAI(parameters: {
		search: string;
		userId: number;
		vendorsKey: string | undefined;
	}): Promise<CoursesResponseDto> {
		const { courses } = await this.findAllByVendors(parameters);

		const prompt =
			"Given a list of courses in JSON format. Analyze these courses by all fields. Return an array with the same length as the input array. Returned array must contain indexes of sorted courses based on their overall quality and interest level, from the most recommended courses to the least. The answer should be without any explanation in the format: [index]. The index starts with 0. For example: the input data to analyze is [{0}, {1}, {2}]. After analyzing, the output should be like: [1, 2, 0]. Please make sure that the returned array has the same length as the input array.";
		const request = `${prompt}\n\n${JSON.stringify(courses)}`;
		const response = await this.openAI.call(request);
		const sortedIndexes = JSON.parse(response) as number[];

		const sortedCourses = courses.map((_, index) => {
			const courseIndex = sortedIndexes[index] as number;

			return courses[courseIndex] as CourseDto;
		});

		return { courses: sortedCourses.filter(Boolean) };
	}

	public async update(id: number): Promise<CourseDto | null> {
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
