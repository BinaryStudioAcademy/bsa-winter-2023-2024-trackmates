import { type Entity } from "~/libs/types/types.js";

class ActivityLikeEntity implements Entity {
	private activityId: number;

	private createdAt: string;

	private id: null | number;

	private notificationId: number;

	private updatedAt: string;

	private userId: number;

	private constructor({
		activityId,
		createdAt,
		id,
		notificationId,
		updatedAt,
		userId,
	}: {
		activityId: number;
		createdAt: string;
		id: null | number;
		notificationId: number;
		updatedAt: string;
		userId: number;
	}) {
		this.createdAt = createdAt;
		this.activityId = activityId;
		this.id = id;
		this.notificationId = notificationId;
		this.updatedAt = updatedAt;
		this.userId = userId;
	}

	public static initialize({
		activityId,
		createdAt,
		id,
		notificationId,
		updatedAt,
		userId,
	}: {
		activityId: number;
		createdAt: string;
		id: null | number;
		notificationId: number;
		updatedAt: string;
		userId: number;
	}): ActivityLikeEntity {
		return new ActivityLikeEntity({
			activityId,
			createdAt,
			id,
			notificationId,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		activityId,
		notificationId,
		userId,
	}: {
		activityId: number;
		notificationId: number;
		userId: number;
	}): ActivityLikeEntity {
		return new ActivityLikeEntity({
			activityId,
			createdAt: "",
			id: null,
			notificationId,
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		activityId: number;
		notificationId: number;
		userId: number;
	} {
		return {
			activityId: this.activityId,
			notificationId: this.notificationId,
			userId: this.userId,
		};
	}

	public toObject(): {
		activityId: number;
		id: number;
		notificationId: number;
		userId: number;
	} {
		return {
			activityId: this.activityId,
			id: this.id as number,
			notificationId: this.notificationId,
			userId: this.userId,
		};
	}
}

export { ActivityLikeEntity };
