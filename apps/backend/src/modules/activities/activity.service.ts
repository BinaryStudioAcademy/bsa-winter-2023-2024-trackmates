import { type Service, type ValueOf } from "~/libs/types/types.js";
import {
	ActivityLikeEntity,
	type ActivityLikeRepository,
} from "~/modules/activity-likes/activity-likes.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityRepository } from "./activity.repository.js";
import { type ActivityTypeValue } from "./libs/enums/enums.js";
import {
	type ActivityGetAllResponseDto,
	type ActivityPayloadMap,
	type ActivityResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	activityLikeRepository: ActivityLikeRepository;
	activityRepository: ActivityRepository;
};

class ActivityService implements Service {
	private activityLikeRepository: ActivityLikeRepository;

	private activityRepository: ActivityRepository;

	public constructor({
		activityLikeRepository,
		activityRepository,
	}: Constructor) {
		this.activityRepository = activityRepository;
		this.activityLikeRepository = activityLikeRepository;
	}

	private mapToDto(
		entity: ActivityEntity,
	): ActivityResponseDto<ValueOf<typeof ActivityTypeValue>> {
		const activity = entity.toObjectWithReactionsCounts();
		const payload = activity.payload as ValueOf<ActivityPayloadMap>;

		return { ...activity, payload };
	}

	public async create<T extends ValueOf<typeof ActivityTypeValue>>(activity: {
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
			const id = existingActivity.toPlainObject().id;

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
			? (activity.toObjectWithReactionsCounts() as ActivityResponseDto<
					ValueOf<typeof ActivityTypeValue>
				>)
			: null;
	}

	public async findAll(userId: number): Promise<ActivityGetAllResponseDto> {
		const friendsActivities = await this.activityRepository.findAll(userId);
		const items = friendsActivities.map((entity) => this.mapToDto(entity));

		return { items };
	}

	public async setLike(
		id: number,
		userId: number,
	): Promise<ActivityResponseDto<ValueOf<typeof ActivityTypeValue>> | null> {
		const like = await this.activityLikeRepository.findByUserIdPostId(
			id,
			userId,
		);

		like?.id
			? await this.activityLikeRepository.delete(like.id)
			: await this.activityLikeRepository.create(
					ActivityLikeEntity.initializeNew({ activityId: id, userId }),
				);

		const targetActivity = await this.activityRepository.find(id);

		return targetActivity ? this.mapToDto(targetActivity) : null;
	}

	public async update(
		id: number,
		activity: ActivityEntity,
	): Promise<ActivityEntity | null> {
		return await this.activityRepository.update(id, activity);
	}
}

export { ActivityService };
