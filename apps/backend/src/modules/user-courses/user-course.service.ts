import {
	type CourseDto,
	type CourseService,
} from "~/modules/courses/courses.js";

import { type UserCourseRepository } from "./user-course.repository.js";

type Constructor = {
	courseService: CourseService;
	userCourseRepository: UserCourseRepository;
};

class UserCourseService {
	private courseService: CourseService;
	private userCourseRepository: UserCourseRepository;

	public constructor({ courseService, userCourseRepository }: Constructor) {
		this.courseService = courseService;
		this.userCourseRepository = userCourseRepository;
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

	public async findAllByUser(userId: number): Promise<CourseDto[]> {
		const entities = await this.userCourseRepository.findByUserId(userId);

		return entities.map((entity) => entity.toObject());
	}
}

export { UserCourseService };
