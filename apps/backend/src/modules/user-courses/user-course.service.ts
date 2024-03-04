import {
	type CourseDto,
	type CourseService,
} from "~/modules/courses/courses.js";

import { type CourseRepository } from "../courses/course.repository.js";

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
	}): Promise<CourseDto & { progress: number }> {
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
	}): Promise<(CourseDto & { progress: number })[]> {
		const entities = await this.courseRepository.findByUserIdWithProgress({
			search,
			userId,
		});

		return entities.map((entity) => entity.toObject());
	}
}

export { UserCourseService };
