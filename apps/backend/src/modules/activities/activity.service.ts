import { type Service, type ValueOf } from "~/libs/types/types.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityRepository } from "./activity.repository.js";
import { type ActivityType } from "./libs/enums/enums.js";
import {
	type ActivityGetAllResponseDto,
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

	public async create<T extends ValueOf<typeof ActivityType>>(activity: {
		actionId: number;
		payload: ActivityPayloadMap[T];
		type: T;
		userId: number;
	}): Promise<ActivityEntity> {
		const { actionId, payload, type, userId } = activity;
		const existingActivity = await this.activityRepository.findByKeyFields({
			actionId,
			type,
			userId,
		});

		if (existingActivity) {
			const { id } = existingActivity.toPlainObject();

			return (await this.activityRepository.update(
				id,
				ActivityEntity.initializeNew({
					actionId,
					payload,
					type,
					userId,
				}),
			)) as ActivityEntity;
		} else {
			return await this.activityRepository.create(
				ActivityEntity.initializeNew(activity),
			);
		}
	}

	public async delete(id: number): Promise<boolean> {
		return await this.activityRepository.delete(id);
	}

	public async deleteByKeyFields<T extends ValueOf<typeof ActivityType>>({
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
	): Promise<ActivityResponseDto<ValueOf<typeof ActivityType>> | null> {
		const activity = await this.activityRepository.find(id);

		return activity
			? (activity.toObject() as ActivityResponseDto<
					ValueOf<typeof ActivityType>
				>)
			: null;
	}

	public async findAll(userId: number): Promise<ActivityGetAllResponseDto> {
		const friendsActivities = await this.activityRepository.findAll(userId);
		const items = friendsActivities.map((entity) => {
			return entity.toObject() as ActivityResponseDto<
				ValueOf<typeof ActivityType>
			>;
		});

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
