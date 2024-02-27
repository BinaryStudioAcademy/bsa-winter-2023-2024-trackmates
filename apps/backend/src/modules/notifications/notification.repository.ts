import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

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
		const { message, sourceUserId, userId } = payload.toNewObject();

		const createdNotification = await this.notificationModel
			.query()
			.insert({ message, sourceUserId, userId })
			.returning("*")
			.withGraphFetched(
				`${RelationName.SOURCE_USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return NotificationEntity.initialize({
			createdAt: createdNotification.createdAt,
			id: createdNotification.id,
			message: createdNotification.message,
			sourceUserAvatarUrl:
				createdNotification.sourceUser.userDetails.avatarFile?.url ?? null,
			sourceUserFirstName: createdNotification.sourceUser.userDetails.firstName,
			sourceUserId: createdNotification.sourceUserId,
			sourceUserLastName: createdNotification.sourceUser.userDetails.lastName,
			updatedAt: createdNotification.updatedAt,
			userId: createdNotification.userId,
		});
	}

	public async delete(notificationId: number): Promise<boolean> {
		return Boolean(
			await this.notificationModel.query().deleteById(notificationId).execute(),
		);
	}

	public async find(
		notificationId: number,
	): Promise<NotificationEntity | null> {
		const notification = await this.notificationModel
			.query()
			.findById(notificationId)
			.withGraphFetched(
				`${RelationName.SOURCE_USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return notification
			? NotificationEntity.initialize({
					createdAt: notification.createdAt,
					id: notification.id,
					message: notification.message,
					sourceUserAvatarUrl:
						notification.sourceUser.userDetails.avatarFile?.url ?? null,
					sourceUserFirstName: notification.sourceUser.userDetails.firstName,
					sourceUserId: notification.sourceUserId,
					sourceUserLastName: notification.sourceUser.userDetails.lastName,
					updatedAt: notification.updatedAt,
					userId: notification.userId,
				})
			: null;
	}

	public async findAll(): Promise<NotificationEntity[]> {
		const notifications = await this.notificationModel
			.query()
			.withGraphFetched(
				`${RelationName.SOURCE_USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return notifications.map((notification) =>
			NotificationEntity.initialize({
				createdAt: notification.createdAt,
				id: notification.id,
				message: notification.message,
				sourceUserAvatarUrl:
					notification.sourceUser.userDetails.avatarFile?.url ?? null,
				sourceUserFirstName: notification.sourceUser.userDetails.firstName,
				sourceUserId: notification.sourceUserId,
				sourceUserLastName: notification.sourceUser.userDetails.lastName,
				updatedAt: notification.updatedAt,
				userId: notification.userId,
			}),
		);
	}

	public async findAllByUserId(userId: number): Promise<NotificationEntity[]> {
		const userNotifications = await this.notificationModel
			.query()
			.where("notifications.userId", "=", userId)
			.withGraphJoined(
				`${RelationName.SOURCE_USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.returning("*")
			.execute();

		return userNotifications.map((notification) =>
			NotificationEntity.initialize({
				createdAt: notification.createdAt,
				id: notification.id,
				message: notification.message,
				sourceUserAvatarUrl:
					notification.sourceUser.userDetails.avatarFile?.url ?? null,
				sourceUserFirstName: notification.sourceUser.userDetails.firstName,
				sourceUserId: notification.sourceUserId,
				sourceUserLastName: notification.sourceUser.userDetails.lastName,
				updatedAt: notification.updatedAt,
				userId: notification.userId,
			}),
		);
	}

	public async findUserNotification(
		userId: number,
		notificationId: number,
	): Promise<NotificationEntity | null> {
		const notification = await this.notificationModel
			.query()
			.findById(notificationId)
			.withGraphFetched(
				`${RelationName.SOURCE_USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.where("userId", "=", userId)
			.execute();

		return notification
			? NotificationEntity.initialize({
					createdAt: notification.createdAt,
					id: notification.id,
					message: notification.message,
					sourceUserAvatarUrl:
						notification.sourceUser.userDetails.avatarFile?.url ?? null,
					sourceUserFirstName: notification.sourceUser.userDetails.firstName,
					sourceUserId: notification.sourceUserId,
					sourceUserLastName: notification.sourceUser.userDetails.lastName,
					updatedAt: notification.updatedAt,
					userId: notification.userId,
				})
			: null;
	}

	public async update(
		notificationId: number,
		payload: NotificationEntity,
	): Promise<NotificationEntity> {
		const updatedNotification = await this.notificationModel
			.query()
			.patchAndFetchById(notificationId, payload.toUpdateObject())
			.withGraphFetched(
				`${RelationName.SOURCE_USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return NotificationEntity.initialize({
			createdAt: updatedNotification.createdAt,
			id: updatedNotification.id,
			message: updatedNotification.message,
			sourceUserAvatarUrl:
				updatedNotification.sourceUser.userDetails.avatarFile?.url ?? null,
			sourceUserFirstName: updatedNotification.sourceUser.userDetails.firstName,
			sourceUserId: updatedNotification.sourceUserId,
			sourceUserLastName: updatedNotification.sourceUser.userDetails.lastName,
			updatedAt: updatedNotification.updatedAt,
			userId: updatedNotification.userId,
		});
	}
}

export { NotificationRepository };
