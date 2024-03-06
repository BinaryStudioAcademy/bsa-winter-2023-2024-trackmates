import { convertPageToZeroIndexed } from "~/libs/helpers/helpers.js";
import { type PaginationResponseDto } from "~/libs/types/types.js";
import {
	type CourseDto,
	type CourseGetAllByUserRequestDto,
	type CourseService,
} from "~/modules/courses/courses.js";

import { type CourseRepository } from "../courses/course.repository.js";
import { type UserCourseResponseDto } from "./libs/types/types.js";

type Constructor = {
	courseRepository: CourseRepository;
	courseService: CourseService;
};

class UserCourseService {
	private courseRepository: CourseRepository;
	private courseService: CourseService;

	public constructor({ courseRepository, courseService }: Constructor) {
		this.courseRepository = courseRepository;
		this.courseService = courseService;
	}

	public async addCourse({
		userId,
		vendorCourseId,
		vendorId,
	}: {
		userId: number;
		vendorCourseId: string;
		vendorId: number;
	}): Promise<UserCourseResponseDto> {
		const course = await this.courseService.addCourse({
			userId,
			vendorCourseId,
			vendorId,
		});

		return {
			...course,
			progress: 0,
		};
	}

	public async findAllByUser({
		count,
		page,
		search,
		userId,
	}: CourseGetAllByUserRequestDto): Promise<PaginationResponseDto<CourseDto>> {
		return await this.courseRepository.findAllByUser({
			count,
			page: convertPageToZeroIndexed(page),
			search,
			userId,
		});
	}
}

export { UserCourseService };
