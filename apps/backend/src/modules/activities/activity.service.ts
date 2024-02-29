// import { sectionActivityRepository } from "./activities.js";
import { type SectionActivityRepository } from "./activity.repository.js";
import { type GetActivitiesResponseDto } from "./libs/types/types.js";

type Constructor = {
	sectionActivityRepository: SectionActivityRepository;
	// courseActivityRepository: CourseActivityRepository; // in future
};

class ActivityService {
	private sectionActivityRepository: SectionActivityRepository;

	public constructor({ sectionActivityRepository }: Constructor) {
		this.sectionActivityRepository = sectionActivityRepository;
	}

	public async getAll(userId: number): Promise<GetActivitiesResponseDto> {
		const sectionActivities =
			await this.sectionActivityRepository.findAll(userId);
		const activities = sectionActivities.map((activity) => activity.toObject());

		return { activities };
	}
}

export { ActivityService };
