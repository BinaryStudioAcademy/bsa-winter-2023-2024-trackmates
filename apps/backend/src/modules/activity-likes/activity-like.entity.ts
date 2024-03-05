import { type Entity, type ValueOf } from "~/libs/types/types.js";

class ActivityLikeEntity implements Entity {
	private createdAt: string;

	private activityId: number;

	private id: null | number;

	private updatedAt: string;

	private userId: number;

	private constructor({
		createdAt,
		activityId,
		id,
		updatedAt,
		userId,
	}: {
		createdAt: string;
		activityId: number;
		id: null | number;
		updatedAt: string;
		userId: number;
	}) {
		this.createdAt = createdAt;
		this.activityId = activityId;
		this.id = id;
		this.updatedAt = updatedAt;
		this.userId = userId;
	}

	public static initialize({
		createdAt,
		activityId,
		id,
		updatedAt,
		userId,
	}: {
		createdAt: string;
		activityId: number;
		id: null | number;
		updatedAt: string;
		userId: number;
	}): ActivityLikeEntity {
		return new ActivityLikeEntity({
			createdAt,
			activityId,
			id,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		activityId,
		userId,
	}: {
		activityId: number;
		userId: number;
	}): ActivityLikeEntity {
		return new ActivityLikeEntity({
			createdAt: "",
			activityId,
			id: null,
			updatedAt: "",
			userId,
		});
	}
}

export { ActivityLikeEntity };
