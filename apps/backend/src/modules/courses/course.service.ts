import { ApplicationError } from "~/libs/exceptions/exceptions.js";

import { UserCourseService } from "../user-courses/user-course.service.js";
import { type VendorApi, type VendorService } from "../vendors/vendors.js";
import { CourseEntity } from "./course.entity.js";
import { CourseRepository } from "./course.repository.js";
import { CourseFieldsMapping } from "./libs/types/types.js";
import {
	type CourseDto,
	type CourseSearchRequestDto,
	type CourseSearchResponseDto,
	type VendorResponseDto,
} from "./libs/types/types.js";

type CourseFieldForMap = keyof Omit<CourseDto, "id" | "vendor">;

type Constructor = {
	courseRepository: CourseRepository;
	userCourseService: UserCourseService;
	vendorService: VendorService;
	vendorsApiMap: Record<string, VendorApi>;
	vendorsFieldsMappingMap: Record<string, CourseFieldsMapping>;
};

class CourseService {
	private courseRepository: CourseRepository;
	private userCourseService: UserCourseService;
	private vendorService: VendorService;
	private vendorsApiMap: Record<string, VendorApi>;
	private vendorsFieldsMappingMap: Record<string, CourseFieldsMapping>;

	public constructor({
		courseRepository,
		userCourseService,
		vendorService,
		vendorsApiMap,
		vendorsFieldsMappingMap,
	}: Constructor) {
		this.courseRepository = courseRepository;
		this.userCourseService = userCourseService;
		this.vendorsApiMap = vendorsApiMap;
		this.vendorsFieldsMappingMap = vendorsFieldsMappingMap;
		this.vendorService = vendorService;
	}

	private async filterCourses(
		courses: CourseDto[],
		userId: number,
	): Promise<CourseDto[]> {
		const userCoursesIds = await this.userCourseService
			.findAllByUser(userId)
			.then((courses) => courses.map(({ id }) => id));

		return courses.filter(({ id }) => !userCoursesIds.includes(id));
	}

	private getVendorApi(vendorKey: string): VendorApi {
		const vendorModule = this.vendorsApiMap[vendorKey];

		if (!vendorModule) {
			throw new ApplicationError({
				message: `Not found api for vendor with key "${vendorKey}"`,
			});
		}

		return vendorModule;
	}

	private getVendorFieldsMapping(vendorKey: string): CourseFieldsMapping {
		const vendorFieldsMapping = this.vendorsFieldsMappingMap[vendorKey];

		if (!vendorFieldsMapping) {
			throw new ApplicationError({
				message: `Not found fields mapping for vendor with key "${vendorKey}"`,
			});
		}

		return vendorFieldsMapping;
	}

	private mapItemFields<T extends string>(
		item: Record<string, unknown>,
		mapping: Record<T, string>,
	): Record<T, unknown> {
		const mappingEntries = Object.entries(mapping) as [T, string][];
		const course = {} as Record<T, unknown>;

		for (const [to, from] of mappingEntries) {
			course[to] = item[from];
		}

		return course;
	}

	private mapVendorCourse(
		item: Record<string, unknown>,
		vendor: VendorResponseDto,
	): CourseDto {
		const course = this.mapItemFields<CourseFieldForMap>(
			item,
			this.getVendorFieldsMapping(vendor.key),
		);

		return { ...course, vendor } as CourseDto;
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
		const vendor = await this.vendorService.findById(vendorId);
		if (!vendor) {
			throw new ApplicationError({
				message: `Not found vendor with id "${vendorId}"`,
			});
		}

		const item = await this.getVendorApi(vendor.key).getCourseById(
			vendorCourseId,
		);

		const course = this.mapVendorCourse(item, vendor);
		const courseEntity = CourseEntity.initializeNew({
			...course,
			vendorId,
		});

		await this.courseRepository.addCourseToUser(courseEntity, userId);

		return course;
	}

	public async findAllByVendor(
		parameters: CourseSearchRequestDto,
		vendor: VendorResponseDto,
	): Promise<CourseDto[]> {
		const items = await this.getVendorApi(vendor.key).getCourses(parameters);

		return items.map((item) => this.mapVendorCourse(item, vendor));
	}

	public async findAllByVendors(
		parameters: CourseSearchRequestDto,
		userId: number,
	): Promise<CourseSearchResponseDto> {
		const { vendors: vendorsKeys } = parameters;
		const vendors = await this.vendorService.findAllByKeys(vendorsKeys);

		let courses: CourseDto[] = [];
		for (const vendor of vendors) {
			const vendorCourses = await this.findAllByVendor(parameters, vendor);
			courses = [...courses, ...vendorCourses];
		}

		courses = await this.filterCourses(courses, userId);

		return { courses };
	}
}

export { CourseService };
