import { type CourseService } from "~/modules/courses/courses.js";

import { type CourseRepository } from "../courses/course.repository.js";
import { type UserCourseDto } from "./libs/types/types.js";

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
	}): Promise<UserCourseDto> {
		const course = await this.courseService.addCourse({
			userId,
			vendorCourseId,
			vendorId,
		});

		const progress = await this.courseService.getProgress({
			courseId: course.id as number,
			userId,
		});

		return {
			...course,
			progress,
		};
	}

	public async findAllByUser({
		search,
		userId,
	}: {
		search: string;
		userId: number;
	}): Promise<UserCourseDto[]> {
		const entities = await this.courseRepository.findByUserId({
			search,
			userId,
		});

		return entities.map((entity) => entity.toObject());
	}
}

export { UserCourseService };
