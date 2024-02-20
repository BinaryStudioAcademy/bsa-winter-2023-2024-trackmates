import { CourseDto } from "../courses/courses.js";
import { UserCourseRepository } from "./user-course.repository.js";

type Constructor = {
	userCourseRepository: UserCourseRepository;
};

class UserCourseService {
	private userCourseRepository: UserCourseRepository;

	public constructor({ userCourseRepository }: Constructor) {
		this.userCourseRepository = userCourseRepository;
	}

	public async findAllByUser(userId: number): Promise<CourseDto[]> {
		const entities = await this.userCourseRepository.findByUserId(userId);

		return entities.map((entity) => entity.toObject());
	}
}

export { UserCourseService };
