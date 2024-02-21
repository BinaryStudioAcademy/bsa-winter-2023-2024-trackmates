import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { UserCourseService } from "~/modules/user-courses/user-courses.js";
import {
	type VendorApi,
	type VendorService,
} from "~/modules/vendors/vendors.js";

import { CourseEntity } from "./course.entity.js";
import { CourseRepository } from "./course.repository.js";
import {
	type CourseDto,
	type CoursesResponseDto,
	type VendorResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	courseRepository: CourseRepository;
	userCourseService: UserCourseService;
	vendorService: VendorService;
	vendorsApiMap: Record<string, VendorApi>;
};

class CourseService {
	private courseRepository: CourseRepository;
	private userCourseService: UserCourseService;
	private vendorService: VendorService;
	private vendorsApiMap: Record<string, VendorApi>;

	public constructor({
		courseRepository,
		userCourseService,
		vendorService,
		vendorsApiMap,
	}: Constructor) {
		this.courseRepository = courseRepository;
		this.userCourseService = userCourseService;
		this.vendorsApiMap = vendorsApiMap;
		this.vendorService = vendorService;
	}

	private async filterCourses(
		courses: CourseDto[],
		userId: number,
	): Promise<CourseDto[]> {
		const userCoursesIds = await this.userCourseService
			.findAllByUser(userId)
			.then((courses) => courses.map(({ vendorCourseId }) => vendorCourseId));

		return courses.filter(({ vendorCourseId }) => {
			return !userCoursesIds.includes(vendorCourseId.toString());
		});
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

		const course = await this.getVendorApi(vendor.key).getCourseById(
			vendorCourseId,
		);

		const courseEntity = CourseEntity.initializeNew({
			description: course.description,
			image: course.image,
			title: course.title,
			url: course.url,
			vendorCourseId: course.vendorCourseId,
			vendorId,
		});

		const addedCourse = await this.courseRepository.addCourseToUser(
			courseEntity,
			userId,
		);

		return addedCourse.toObject();
	}

	public async findAllByVendor(
		search: string,
		vendor: VendorResponseDto,
	): Promise<CourseDto[]> {
		const items = await this.getVendorApi(vendor.key).getCourses(search);

		return items.map((item) => ({ ...item, id: null, vendor }));
	}

	public async findAllByVendors(parameters: {
		search: string;
		userId: number;
		vendorsKeys: string | undefined;
	}): Promise<CoursesResponseDto> {
		const { search, userId, vendorsKeys } = parameters;
		const vendors = vendorsKeys
			? await this.vendorService.findAllByKeys(vendorsKeys.split(","))
			: await this.vendorService.findAll();

		const vendorsCourses = await Promise.all(
			vendors.map(async (vendor) => {
				return await this.findAllByVendor(search, vendor);
			}),
		);
		let courses = vendorsCourses.flat();

		courses = await this.filterCourses(courses, userId);

		return { courses };
	}
}

export { CourseService };
