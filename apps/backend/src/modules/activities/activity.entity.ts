import { type Entity, type ValueOf } from "~/libs/types/types.js";
import { type GroupResponseDto } from "~/modules/groups/groups.js";
import { type SubscriptionResponseDto } from "~/modules/subscriptions/subscriptions.js";
import { type UserEntity } from "~/modules/users/user.entity.js";
import { type UserSex } from "~/modules/users/users.js";

import { type ActivityType } from "./libs/enums/enums.js";

class ActivityEntity implements Entity {
	private isLikedByUser: boolean | null;

	public actionId: number;

	public commentCount: null | number;

	public id: null | number;

	public likesCount: null | number;

	public payload: unknown;

	public type: ValueOf<typeof ActivityType>;

	public updatedAt: string;

	public user: UserEntity | null;

	public userId: number;

	private constructor({
		actionId,
		commentCount,
		id,
		isLikedByUser,
		likesCount,
		payload,
		type,
		updatedAt,
		user,
		userId,
	}: {
		actionId: number;
		commentCount: null | number;
		id: null | number;
		isLikedByUser: boolean | null;
		likesCount: null | number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		updatedAt: string;
		user: UserEntity | null;
		userId: number;
	}) {
		this.actionId = actionId;
		this.id = id;
		this.isLikedByUser = isLikedByUser;
		this.likesCount = likesCount;
		this.payload = payload;
		this.type = type;
		this.updatedAt = updatedAt;
		this.commentCount = commentCount;
		this.user = user;
		this.userId = userId;
	}

	public static initialize({
		actionId,
		commentCount,
		id,
		isLikedByUser,
		likesCount,
		payload,
		type,
		updatedAt,
		user,
		userId,
	}: {
		actionId: number;
		commentCount: null | number;
		id: number;
		isLikedByUser: boolean | null;
		likesCount: null | number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		updatedAt: string;
		user: UserEntity | null;
		userId: number;
	}): ActivityEntity {
		return new ActivityEntity({
			actionId,
			commentCount,
			id,
			isLikedByUser,
			likesCount,
			payload,
			type,
			updatedAt,
			user,
			userId,
		});
	}

	public static initializeNew({
		actionId,
		payload,
		type,
		userId,
	}: {
		actionId: number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		userId: number;
	}): ActivityEntity {
		return new ActivityEntity({
			actionId,
			commentCount: null,
			id: null,
			isLikedByUser: null,
			likesCount: null,
			payload,
			type,
			updatedAt: "",
			user: null,
			userId,
		});
	}

	public toNewObject(): {
		actionId: number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		userId: number;
	} {
		return {
			actionId: this.actionId,
			payload: this.payload,
			type: this.type,
			userId: this.userId,
		};
	}

	public toObject(): {
		actionId: number;
		id: number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		updatedAt: string;
		user: {
			avatarUrl: string;
			createdAt: string;
			email: string;
			firstName: string;
			groups: GroupResponseDto[];
			id: number;
			lastName: string;
			nickname: null | string;
			sex: ValueOf<typeof UserSex> | null;
			subscription: SubscriptionResponseDto | null;
			updatedAt: string;
		};
		userId: number;
	} {
		return {
			actionId: this.actionId,
			id: this.id as number,
			payload: this.payload,
			type: this.type,
			updatedAt: this.updatedAt,
			user: (this.user as UserEntity).toObject(),
			userId: this.userId,
		};
	}

	public toObjectWithRelationsAndCounts(): {
		actionId: number;
		commentCount: null | number;
		id: number;
		isLikedByUser: boolean;
		likesCount: null | number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		updatedAt: string;
		user: {
			avatarUrl: string;
			createdAt: string;
			email: string;
			firstName: string;
			groups: GroupResponseDto[];
			id: number;
			lastName: string;
			nickname: null | string;
			sex: ValueOf<typeof UserSex> | null;
			subscription: SubscriptionResponseDto | null;
			updatedAt: string;
		};
		userId: number;
	} {
		return {
			actionId: this.actionId,
			commentCount: Number(this.commentCount),
			id: this.id as number,
			isLikedByUser: this.isLikedByUser ?? false,
			likesCount: Number(this.likesCount),
			payload: this.payload,
			type: this.type,
			updatedAt: this.updatedAt,
			user: (this.user as UserEntity).toObject(),
			userId: this.userId,
		};
	}

	public toPlainObject(): {
		actionId: number;
		id: number;
		payload: unknown;
		type: ValueOf<typeof ActivityType>;
		updatedAt: string;
		userId: number;
	} {
		return {
			actionId: this.actionId,
			id: this.id as number,
			payload: this.payload,
			type: this.type,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}
}

export { ActivityEntity };
