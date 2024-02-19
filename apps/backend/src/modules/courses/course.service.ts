import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { type Udemy } from "~/libs/modules/udemy/udemy.js";

import { VendorService } from "../vendors/vendor.service.js";
import { CourseEntity } from "./course.entity.js";
import { CourseRepository } from "./course.repository.js";
import { CourseFieldsMapping } from "./libs/enums/enums.js";
import {
	type CourseDto,
	type CourseSearchRequestDto,
	type CourseSearchResponseDto,
	type VendorResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	courseRepository: CourseRepository;
	udemy: Udemy;
	vendorService: VendorService;
};

type CourseFieldForMap = keyof Omit<CourseDto, "id" | "vendor">;
//todo move
const VendorsCourseMappings: Record<
	string,
	Record<CourseFieldForMap, string>
> = {
	udemy: CourseFieldsMapping, // todo rename UdemyCourseFieldsMapping
};

class CourseService {
	private courseRepository: CourseRepository;
	private udemy: Udemy;
	private vendorService: VendorService;

	public constructor({ courseRepository, udemy, vendorService }: Constructor) {
		this.courseRepository = courseRepository;
		this.udemy = udemy;
		this.vendorService = vendorService;
	}

	private async findAllByVendor(
		parameters: CourseSearchRequestDto,
		vendor: VendorResponseDto,
	): Promise<CourseDto[]> {
		const coursesVendorService = this.getCoursesVendorService(vendor);
		const items = await coursesVendorService.getCourses(parameters);
		return items.map((item) => this.mapVendorCourse(item, vendor));
	}

	// todo create CourseVendorService
	private getCoursesVendorService(vendor: VendorResponseDto): Udemy {
		if (vendor.key === "udemy") {
			return this.udemy;
		}
		throw new ApplicationError({
			message: `Not found vendor with key "${vendor.key}"`,
		});
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
			VendorsCourseMappings[vendor.key] as Record<CourseFieldForMap, string>,
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
		const coursesVendorService = this.getCoursesVendorService(vendor);

		const item = await coursesVendorService.getCourseById(vendorCourseId);
		const course = this.mapVendorCourse(item, vendor);

		const courseEntity = CourseEntity.initializeNew({
			...course,
			vendorId,
		});

		await this.courseRepository.addCourseToUser(courseEntity, userId);

		return course;
	}

	public async findAllByVendors(
		parameters: CourseSearchRequestDto,
		// userId: number,
	): Promise<CourseSearchResponseDto> {
		const { vendors: vendorsKeys } = parameters;
		const vendors = await this.vendorService.findAllByKeys(vendorsKeys);

		let courses: CourseDto[] = [];
		for (const vendor of vendors) {
			const vendorCourses = await this.findAllByVendor(parameters, vendor);
			courses = { ...courses, ...vendorCourses };
		}

		// courses = await this.filterCourses(courses, userId);

		return { courses };
	}

	// private filterCourses(courses: CourseDto[], userId: number): Promise<CourseDto[]> {
	// 	return Promise.resolve(courses);
	// }
}

export { CourseService };
