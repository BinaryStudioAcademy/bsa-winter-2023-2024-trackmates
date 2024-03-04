import { type ValueOf } from "~/libs/types/types.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityRepository } from "./activity.repository.js";
import {
	type ActivityGetActivitiesResponseDto,
	type ActivityPayloadMap,
	type ActivityResponseDto,
	type ActivityType,
} from "./libs/types/types.js";

type Constructor = {
	activityRepository: ActivityRepository;
};

class ActivityService {
	private activityRepository: ActivityRepository;

	public constructor({ activityRepository }: Constructor) {
		this.activityRepository = activityRepository;
	}

	private mapToDto(entity: ActivityEntity): ActivityResponseDto<ActivityType> {
		const activity = entity.toObject();
		const payload = JSON.parse(activity.payload) as ValueOf<ActivityPayloadMap>;

		return { ...activity, payload };
	}

	public async create<T extends ActivityType>({
		actionId,
		payload,
		type,
		userId,
	}: {
		actionId: number;
		payload: ActivityPayloadMap[T];
		type: T;
		userId: number;
	}): Promise<ActivityEntity> {
		return await this.activityRepository.create(
			ActivityEntity.initializeNew({
				actionId,
				payload: JSON.stringify(payload),
				type,
				userId,
			}),
		);
	}

	public async delete<T extends ActivityType>({
		actionId,
		type,
		userId,
	}: {
		actionId: number;
		type: T;
		userId: number;
	}): Promise<boolean> {
		return await this.activityRepository.delete({
			actionId,
			type,
			userId,
		});
	}

	public async getAll(
		userId: number,
	): Promise<ActivityGetActivitiesResponseDto> {
		const friendsActivities = await this.activityRepository.findAll(userId);
		const activities = friendsActivities.map((entity) => this.mapToDto(entity));

		return { activities };
	}
}

export { ActivityService };
