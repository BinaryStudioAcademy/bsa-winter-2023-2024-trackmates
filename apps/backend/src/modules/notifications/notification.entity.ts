import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type NotificationStatus } from "./libs/enums/enums.js";

class NotificationEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private message: string;

	private sourceUserAvtarUrl: null | string;

	private sourceUserFirstName: null | string;

	private sourceUserId: number;

	private sourceUserLastName: null | string;

	private status: ValueOf<typeof NotificationStatus>;

	private updatedAt: string;

	private userId: number;

	private constructor({
		createdAt,
		id,
		message,
		sourceUserAvatarUrl,
		sourceUserFirstName,
		sourceUserId,
		sourceUserLastName,
		status,
		updatedAt,
		userId,
	}: {
		createdAt: string;
		id: null | number;
		message: string;
		sourceUserAvatarUrl: null | string;
		sourceUserFirstName: null | string;
		sourceUserId: number;
		sourceUserLastName: null | string;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userId: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.message = message;
		this.sourceUserAvtarUrl = sourceUserAvatarUrl;
		this.sourceUserFirstName = sourceUserFirstName;
		this.sourceUserId = sourceUserId;
		this.sourceUserLastName = sourceUserLastName;
		this.status = status;
		this.updatedAt = updatedAt;
		this.userId = userId;
	}

	public static initialize({
		createdAt,
		id,
		message,
		sourceUserAvatarUrl,
		sourceUserFirstName,
		sourceUserId,
		sourceUserLastName,
		status,
		updatedAt,
		userId,
	}: {
		createdAt: string;
		id: null | number;
		message: string;
		sourceUserAvatarUrl: null | string;
		sourceUserFirstName: string;
		sourceUserId: number;
		sourceUserLastName: string;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userId: number;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt,
			id,
			message,
			sourceUserAvatarUrl,
			sourceUserFirstName,
			sourceUserId,
			sourceUserLastName,
			status,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		message,
		sourceUserId,
		status,
		userId,
	}: {
		message: string;
		sourceUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		userId: number;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt: "",
			id: null,
			message,
			sourceUserAvatarUrl: null,
			sourceUserFirstName: null,
			sourceUserId,
			sourceUserLastName: null,
			status,
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		createdAt: string;
		message: string;
		sourceUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userId: number;
	} {
		return {
			createdAt: this.createdAt,
			message: this.message,
			sourceUserId: this.sourceUserId,
			status: this.status,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		message: string;
		sourceUserAvatarUrl: string;
		sourceUserFirstName: string;
		sourceUserId: number;
		sourceUserLastName: string;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userId: number;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			message: this.message,
			sourceUserAvatarUrl: this.sourceUserAvtarUrl as string,
			sourceUserFirstName: this.sourceUserFirstName as string,
			sourceUserId: this.sourceUserId,
			sourceUserLastName: this.sourceUserLastName as string,
			status: this.status,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}

	public toUpdateObject(): {
		message: string;
		status: ValueOf<typeof NotificationStatus>;
	} {
		return { message: this.message, status: this.status };
	}
}

export { NotificationEntity };
