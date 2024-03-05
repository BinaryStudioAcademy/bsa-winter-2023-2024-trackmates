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
	}): Promise<CourseDto> {
		return await this.courseService.addCourse({
			userId,
			vendorCourseId,
			vendorId,
		});
	}

	public async findAllByUser({
		search,
		userId,
	}: {
		search: string;
		userId: number;
	}): Promise<CourseDto[]> {
		const entities = await this.courseRepository.findByUserId({
			search,
			userId,
		});

		return entities.map((entity) => entity.toObject());
	}
}

export { UserCourseService };
