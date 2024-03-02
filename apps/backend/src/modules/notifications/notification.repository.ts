import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { NotificationStatus } from "./libs/enums/enums.js";
import { NotificationEntity } from "./notification.entity.js";
import { type NotificationModel } from "./notification.model.js";

class NotificationRepository implements Repository<NotificationEntity> {
	private notificationModel: typeof NotificationModel;

	public constructor(notificationModel: typeof NotificationModel) {
		this.notificationModel = notificationModel;
	}

	public async create(
		payload: NotificationEntity,
	): Promise<NotificationEntity> {
		const { message, receiverUserId, type, userId } = payload.toNewObject();

		const createdNotification = await this.notificationModel
			.query()
			.insert({ message, receiverUserId, type, userId })
			.returning("*")
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return NotificationEntity.initialize({
			createdAt: createdNotification.createdAt,
			id: createdNotification.id,
			message: createdNotification.message,
			receiverUserId: createdNotification.receiverUserId,
			status: createdNotification.status,
			type: createdNotification.type,
			updatedAt: createdNotification.updatedAt,
			userAvatarUrl:
				createdNotification.user.userDetails.avatarFile?.url ?? null,
			userFirstName: createdNotification.user.userDetails.firstName,
			userId: createdNotification.userId,
			userLastName: createdNotification.user.userDetails.lastName,
		});
	}

	public async delete(notificationId: number): Promise<boolean> {
		const deletedRowsCount = await this.notificationModel
			.query()
			.deleteById(notificationId)
			.execute();

		return Boolean(deletedRowsCount);
	}

	public async find(
		notificationId: number,
	): Promise<NotificationEntity | null> {
		const notification = await this.notificationModel
			.query()
			.findById(notificationId)
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return notification
			? NotificationEntity.initialize({
					createdAt: notification.createdAt,
					id: notification.id,
					message: notification.message,
					receiverUserId: notification.receiverUserId,
					status: notification.status,
					type: notification.type,
					updatedAt: notification.updatedAt,
					userAvatarUrl: notification.user.userDetails.avatarFile?.url ?? null,
					userFirstName: notification.user.userDetails.firstName,
					userId: notification.userId,
					userLastName: notification.user.userDetails.lastName,
				})
			: null;
	}

	public async findAll(): Promise<NotificationEntity[]> {
		const notifications = await this.notificationModel
			.query()
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return notifications.map((notification) => {
			return NotificationEntity.initialize({
				createdAt: notification.createdAt,
				id: notification.id,
				message: notification.message,
				receiverUserId: notification.receiverUserId,
				status: notification.status,
				type: notification.type,
				updatedAt: notification.updatedAt,
				userAvatarUrl: notification.user.userDetails.avatarFile?.url ?? null,
				userFirstName: notification.user.userDetails.firstName,
				userId: notification.userId,
				userLastName: notification.user.userDetails.lastName,
			});
		});
	}

	public async findAllByUserId(userId: number): Promise<NotificationEntity[]> {
		const userNotifications = await this.notificationModel
			.query()
			.where("notifications.receiverUserId", "=", userId)
			.withGraphJoined(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.orderBy("notifications.createdAt", "desc")
			.returning("*")
			.execute();

		return userNotifications.map((notification) => {
			return NotificationEntity.initialize({
				createdAt: notification.createdAt,
				id: notification.id,
				message: notification.message,
				receiverUserId: notification.receiverUserId,
				status: notification.status,
				type: notification.type,
				updatedAt: notification.updatedAt,
				userAvatarUrl: notification.user.userDetails.avatarFile?.url ?? null,
				userFirstName: notification.user.userDetails.firstName,
				userId: notification.userId,
				userLastName: notification.user.userDetails.lastName,
			});
		});
	}

	public async hasUserUnreadNotifications(userId: number): Promise<boolean> {
		const emptyArrayLength = 0;

		const unreadNotifications = await this.notificationModel
			.query()
			.where("receiverUserId", "=", userId)
			.andWhere("status", "=", NotificationStatus.UNREAD);

		return unreadNotifications.length > emptyArrayLength;
	}

	public async update(
		notificationId: number,
		payload: NotificationEntity,
	): Promise<NotificationEntity> {
		const updatedNotification = await this.notificationModel
			.query()
			.patchAndFetchById(notificationId, payload.toUpdateObject())
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return NotificationEntity.initialize({
			createdAt: updatedNotification.createdAt,
			id: updatedNotification.id,
			message: updatedNotification.message,
			receiverUserId: updatedNotification.receiverUserId,
			status: updatedNotification.status,
			type: updatedNotification.type,
			updatedAt: updatedNotification.updatedAt,
			userAvatarUrl:
				updatedNotification.user.userDetails.avatarFile?.url ?? null,
			userFirstName: updatedNotification.user.userDetails.firstName,
			userId: updatedNotification.userId,
			userLastName: updatedNotification.user.userDetails.lastName,
		});
	}
}

export { NotificationRepository };
