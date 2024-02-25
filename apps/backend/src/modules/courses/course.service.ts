import { HTTPCode } from "~/libs/enums/enums.js";
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
	vendorService: VendorService;
	vendorsApiMap: Record<string, VendorApi>;
};

class CourseService {
	private courseRepository: CourseRepository;
	private vendorService: VendorService;
	private vendorsApiMap: Record<string, VendorApi>;

	public constructor({
		courseRepository,
		vendorService,
		vendorsApiMap,
	}: Constructor) {
		this.courseRepository = courseRepository;
		this.vendorsApiMap = vendorsApiMap;
		this.vendorService = vendorService;
	}

	private async filterCourses(
		courses: CourseDto[],
		userId: number,
	): Promise<CourseDto[]> {
		const userCourses = await this.courseRepository.findByUserId(userId);
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
