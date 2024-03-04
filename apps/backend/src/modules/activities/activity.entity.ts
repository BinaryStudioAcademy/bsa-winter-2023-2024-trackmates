import { type Entity, type ValueOf } from "~/libs/types/types.js";
import { type UserEntity } from "~/modules/users/user.entity.js";

import { type ActivityTypeValue } from "./libs/enums/enums.js";

class ActivityEntity implements Entity {
	public actionId: number;

	public id: null | number;

	public payload: unknown;

	public type: ValueOf<typeof ActivityTypeValue>;

	public updatedAt: string;

	public user: UserEntity | null;

	public userId: number;

	private constructor({
		actionId,
		id,
		payload,
		type,
		updatedAt,
		user,
		userId,
	}: {
		actionId: number;
		id: null | number;
		payload: unknown;
		type: ValueOf<typeof ActivityTypeValue>;
		updatedAt: string;
		user: UserEntity | null;
		userId: number;
	}) {
		this.actionId = actionId;
		this.id = id;
		this.payload = payload;
		this.type = type;
		this.updatedAt = updatedAt;
		this.user = user;
		this.userId = userId;
	}

	public static initialize({
		actionId,
		id,
		payload,
		type,
		updatedAt,
		user,
		userId,
	}: {
		actionId: number;
		id: number;
		payload: unknown;
		type: ValueOf<typeof ActivityTypeValue>;
		updatedAt: string;
		user: UserEntity | null;
		userId: number;
	}): ActivityEntity {
		return new ActivityEntity({
			actionId,
			id,
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
		type: ValueOf<typeof ActivityTypeValue>;
		userId: number;
	}): ActivityEntity {
		return new ActivityEntity({
			actionId,
			id: null,
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
		type: ValueOf<typeof ActivityTypeValue>;
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
		type: ValueOf<typeof ActivityTypeValue>;
		updatedAt: string;
		user: {
			avatarUrl: string;
			createdAt: string;
			email: string;
			firstName: string;
			id: number;
			lastName: string;
			nickname: null | string;
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
}

export { ActivityEntity };
