import { GetUserCoursesResponseDto } from "./libs/types/types.js";
import { UserCourseRepository } from "./user-course.repository.js";

type Constructor = {
	userCourseRepository: UserCourseRepository;
};

class UserCourseService {
	private userCourseRepository: UserCourseRepository;

	public constructor({ userCourseRepository }: Constructor) {
		this.userCourseRepository = userCourseRepository;
	}

	public async findAllByUser(
		userId: number,
	): Promise<GetUserCoursesResponseDto> {
		const entities = await this.userCourseRepository.findByUserId(userId);
		const courses = entities.map((entity) => entity.toObject());

		return { courses };
	}
}

export { UserCourseService };
