import { type Entity } from "~/libs/types/types.js";

class NotificationEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private message: string;

	private sourceUserAvtarUrl: null | string;

	private sourceUserFirstName: null | string;

	private sourceUserId: number;

	private sourceUserLastName: null | string;

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
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		message,
		sourceUserId,
		userId,
	}: {
		message: string;
		sourceUserId: number;
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
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		createdAt: string;
		message: string;
		sourceUserId: number;
		updatedAt: string;
		userId: number;
	} {
		return {
			createdAt: this.createdAt,
			message: this.message,
			sourceUserId: this.sourceUserId,
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
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}

	public toUpdateObject(): { message: string } {
		return { message: this.message };
	}
}

export { NotificationEntity };
