import { type Udemy } from "~/libs/modules/udemy/udemy.js";

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
};

//TODO
const UDEMY_VENDOR = { id: 1, key: "udemy", name: "Udemy" };

class CourseService {
	private courseRepository: CourseRepository;
	private udemy: Udemy;

	public constructor({ courseRepository, udemy }: Constructor) {
		this.courseRepository = courseRepository;
		this.udemy = udemy;
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

	private mapToCourse(
		item: Record<string, unknown>,
		vendor: VendorResponseDto,
	): CourseDto {
		const course = this.mapItemFields<keyof Omit<CourseDto, "id" | "vendor">>(
			item,
			CourseFieldsMapping,
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
		const item = await this.udemy.getCourseById(
			Number.parseInt(vendorCourseId),
		);
		const course = this.mapToCourse(item, UDEMY_VENDOR);

		const courseEntity = CourseEntity.initializeNew({
			...course,
			vendorId,
		});

		await this.courseRepository.addCourseToUser(courseEntity, userId);

		return course;
	}

	public async findAllByVendor(
		parameters: CourseSearchRequestDto,
	): Promise<CourseSearchResponseDto> {
		const items = await this.udemy.getCourses(parameters);
		const courses = items.map((item) => this.mapToCourse(item, UDEMY_VENDOR));

		return { courses };
	}
}

export { CourseService };
