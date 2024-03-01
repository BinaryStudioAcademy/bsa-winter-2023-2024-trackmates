import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type NotificationStatus } from "./libs/enums/enums.js";

class NotificationEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private message: string;

	private receiverUserId: number;

	private status: ValueOf<typeof NotificationStatus>;

	private updatedAt: string;

	private userAvatarUrl: null | string;

	private userFirstName: null | string;

	private userId: number;

	private userLastName: null | string;

	private constructor({
		createdAt,
		id,
		message,
		receiverUserId,
		status,
		updatedAt,
		userAvatarUrl,
		userFirstName,
		userId,
		userLastName,
	}: {
		createdAt: string;
		id: null | number;
		message: string;
		receiverUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userAvatarUrl: null | string;
		userFirstName: null | string;
		userId: number;
		userLastName: null | string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.message = message;
		this.receiverUserId = receiverUserId;
		this.status = status;
		this.updatedAt = updatedAt;
		this.userAvatarUrl = userAvatarUrl;
		this.userFirstName = userFirstName;
		this.userId = userId;
		this.userLastName = userLastName;
	}

	public static initialize({
		createdAt,
		id,
		message,
		receiverUserId,
		status,
		updatedAt,
		userAvatarUrl,
		userFirstName,
		userId,
		userLastName,
	}: {
		createdAt: string;
		id: null | number;
		message: string;
		receiverUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userAvatarUrl: null | string;
		userFirstName: string;
		userId: number;
		userLastName: string;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt,
			id,
			message,
			receiverUserId,
			status,
			updatedAt,
			userAvatarUrl,
			userFirstName,
			userId,
			userLastName,
		});
	}

	public static initializeNew({
		message,
		receiverUserId,
		status,
		userId,
	}: {
		message: string;
		receiverUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		userId: number;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt: "",
			id: null,
			message,
			receiverUserId,
			status,
			updatedAt: "",
			userAvatarUrl: null,
			userFirstName: null,
			userId,
			userLastName: null,
		});
	}

	public toNewObject(): {
		createdAt: string;
		message: string;
		receiverUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userId: number;
	} {
		return {
			createdAt: this.createdAt,
			message: this.message,
			receiverUserId: this.receiverUserId,
			status: this.status,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		message: string;
		receiverUserId: number;
		status: ValueOf<typeof NotificationStatus>;
		updatedAt: string;
		userAvatarUrl: string;
		userFirstName: string;
		userId: number;
		userLastName: string;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			message: this.message,
			receiverUserId: this.receiverUserId,
			status: this.status,
			updatedAt: this.updatedAt,
			userAvatarUrl: this.userAvatarUrl as string,
			userFirstName: this.userFirstName as string,
			userId: this.userId,
			userLastName: this.userLastName as string,
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
