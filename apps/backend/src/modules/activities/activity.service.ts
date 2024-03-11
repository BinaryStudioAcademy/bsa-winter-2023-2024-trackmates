import { type Service, type ValueOf } from "~/libs/types/types.js";
import {
	ActivityLikeEntity,
	type ActivityLikeRepository,
} from "~/modules/activity-likes/activity-likes.js";
import {
	type NotificationService,
	NotificationType,
} from "~/modules/notifications/notifications.js";

import { ActivityEntity } from "./activity.entity.js";
import { type ActivityRepository } from "./activity.repository.js";
import { type ActivityType } from "./libs/enums/enums.js";
import {
	type ActivityGetAllResponseDto,
	type ActivityPayloadMap,
	type ActivityResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	activityLikeRepository: ActivityLikeRepository;
	activityRepository: ActivityRepository;
	notificationService: NotificationService;
};

class ActivityService implements Service {
	private activityLikeRepository: ActivityLikeRepository;

	private activityRepository: ActivityRepository;

	private notificationService: NotificationService;

	public constructor({
		activityLikeRepository,
		activityRepository,
		notificationService,
	}: Constructor) {
		this.activityRepository = activityRepository;
		this.activityLikeRepository = activityLikeRepository;
		this.notificationService = notificationService;
	}

	public async changeLike(
		activityId: number,
		userId: number,
	): Promise<ActivityResponseDto<ValueOf<typeof ActivityType>> | null> {
		const like = await this.activityLikeRepository.findByUserIdPostId(
			activityId,
			userId,
		);

		const likeObject = like?.toObject();
		const targetActivity = await this.activityRepository.find(activityId);

		if (likeObject?.id) {
			await this.activityLikeRepository.delete(likeObject.id);
		} else {
			await this.activityLikeRepository.create(
				ActivityLikeEntity.initializeNew({ activityId, userId }),
			);

			await this.notificationService.create({
				receiverUserId: targetActivity?.userId as number,
				type: NotificationType.NEW_LIKE,
				userId,
			});
		}

		const updatedTargetActivity =
			await this.activityRepository.find(activityId);

		return updatedTargetActivity
			? (updatedTargetActivity.toObjectWithRelationsAndCounts() as ActivityResponseDto<
					ValueOf<typeof ActivityType>
				>)
			: null;
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
			? (activity.toObjectWithRelationsAndCounts() as ActivityResponseDto<
					ValueOf<typeof ActivityType>
				>)
			: null;
	}

	public async findAll(userId: number): Promise<ActivityGetAllResponseDto> {
		const friendsActivities = await this.activityRepository.findAll(userId);
		const items = friendsActivities.map((entity) => {
			return entity.toObjectWithRelationsAndCounts() as ActivityResponseDto<
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
