import { type CourseService } from "~/modules/courses/courses.js";

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
		search,
		userId,
	}: {
		search: string;
		userId: number;
	}): Promise<UserCourseResponseDto[]> {
		return await this.courseRepository.findByUserIdWithProgress({
			search,
			userId,
		});
	}
}

export { UserCourseService };
