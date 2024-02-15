import { type Udemy } from "~/libs/modules/udemy/udemy.js";

import {
	CourseFieldsMapping,
	CourseInstructorFieldsMapping,
} from "./libs/enums/enums.js";
import {
	type CourseInstructorResponseDto,
	type CourseResponseDto,
	type CourseSearchRequestDto,
	type CourseSearchResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	udemy: Udemy;
};

class CourseService {
	private udemy: Udemy;

	public constructor({ udemy }: Constructor) {
		this.udemy = udemy;
	}

	private mapInstructorFields(
		item: Record<string, unknown>,
	): CourseInstructorResponseDto {
		const instructor = this.mapItemFields<keyof CourseInstructorResponseDto>(
			item,
			CourseInstructorFieldsMapping,
		);

		return instructor as CourseInstructorResponseDto;
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

	private mapToCourse(item: Record<string, unknown>): CourseResponseDto {
		const course = this.mapItemFields<keyof CourseResponseDto>(
			item,
			CourseFieldsMapping,
		);

		course.instructors = (course.instructors as Record<string, unknown>[]).map(
			(item) => this.mapInstructorFields(item),
		);

		return course as CourseResponseDto;
	}

	public async findAllByVendor(
		parameters: CourseSearchRequestDto,
	): Promise<CourseSearchResponseDto> {
		const items = await this.udemy.getCourses(parameters);
		const courses = items.map((item) => this.mapToCourse(item));

		return { courses };
	}
}

export { CourseService };
