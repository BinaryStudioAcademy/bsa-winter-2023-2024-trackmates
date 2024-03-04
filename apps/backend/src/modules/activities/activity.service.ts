import { type Service, type ValueOf } from "~/libs/types/types.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityRepository } from "./activity.repository.js";
import { type ActivityTypeValue } from "./libs/enums/enums.js";
import {
	type ActivityGetActivitiesResponseDto,
	type ActivityPayloadMap,
	type ActivityResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	activityRepository: ActivityRepository;
};

class ActivityService implements Service {
	private activityRepository: ActivityRepository;

	public constructor({ activityRepository }: Constructor) {
		this.activityRepository = activityRepository;
	}

	private mapToDto(
		entity: ActivityEntity,
	): ActivityResponseDto<ValueOf<typeof ActivityTypeValue>> {
		const activity = entity.toObject();
		const payload = activity.payload as ValueOf<ActivityPayloadMap>;

		return { ...activity, payload };
	}

	public async create<T extends ValueOf<typeof ActivityTypeValue>>(activity: {
		actionId: number;
		payload: ActivityPayloadMap[T];
		type: T;
		userId: number;
	}): Promise<ActivityEntity> {
		return await this.activityRepository.create(
			ActivityEntity.initializeNew(activity),
		);
	}

	public async delete(id: number): Promise<boolean> {
		return await this.activityRepository.delete(id);
	}

	public async deleteByKeyFields<T extends ValueOf<typeof ActivityTypeValue>>({
		actionId,
		type,
		userId,
	}: {
		actionId: number;
		type: T;
		userId: number;
	}): Promise<boolean> {
		return await this.activityRepository.deleteByKeyFields({
			actionId,
			type,
			userId,
		});
	}

	public async find(
		id: number,
	): Promise<ActivityResponseDto<ValueOf<typeof ActivityTypeValue>> | null> {
		const activity = await this.activityRepository.find(id);

		return activity
			? (activity.toObject() as ActivityResponseDto<
					ValueOf<typeof ActivityTypeValue>
				>)
			: null;
	}

	public async findAll(
		userId: number,
	): Promise<ActivityGetActivitiesResponseDto> {
		const friendsActivities = await this.activityRepository.findAll(userId);
		const items = friendsActivities.map((entity) => this.mapToDto(entity));

		return { items };
	}

	public async update(
		id: number,
		activity: ActivityEntity,
	): Promise<ActivityEntity | null> {
		return await this.activityRepository.update(id, activity);
	}
}

export { ActivityService };
