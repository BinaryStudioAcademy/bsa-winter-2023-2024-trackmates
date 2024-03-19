import { RelationName, SortOrder } from "~/libs/enums/enums.js";
import { type Repository, type ValueOf } from "~/libs/types/types.js";
import { type UserModel } from "~/modules/users/users.js";

import { NotificationStatus, NotificationType } from "./libs/enums/enums.js";
import { type notificationFilterToType } from "./libs/maps/maps.js";
import { NotificationEntity } from "./notification.entity.js";
import { type NotificationModel } from "./notification.model.js";

class NotificationRepository implements Repository<NotificationEntity> {
	private notificationModel: typeof NotificationModel;

	public constructor(notificationModel: typeof NotificationModel) {
		this.notificationModel = notificationModel;
	}

	private getMessageByType(
		type: ValueOf<typeof NotificationType>,
		user: UserModel,
	): string {
		const notificationTypeToMessage: Record<
			ValueOf<typeof NotificationType>,
			string
		> = {
			[NotificationType.NEW_COMMENT]: `${user.userDetails.firstName} ${user.userDetails.lastName} left a comment.`,
			[NotificationType.NEW_FOLLOWER]: `${user.userDetails.firstName} ${user.userDetails.lastName} started following you.`,
			[NotificationType.NEW_LIKE]: `${user.userDetails.firstName} ${user.userDetails.lastName} liked your activity.`,
		};

		return notificationTypeToMessage[type];
	}

	public async create(
		payload: NotificationEntity,
	): Promise<NotificationEntity> {
		const { actionId, receiverUserId, type, userId } = payload.toNewObject();

		const createdNotification = await this.notificationModel
			.query()
			.insert({ actionId, receiverUserId, type, userId })
			.returning("*")
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return NotificationEntity.initialize({
			actionId: createdNotification.actionId,
			createdAt: createdNotification.createdAt,
			id: createdNotification.id,
			message: this.getMessageByType(
				createdNotification.type,
				createdNotification.user,
			),
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

	public async deleteAllNotificationByParameters(
		id: number,
		receiverUserId: number,
		type: string,
	): Promise<boolean> {
		const deletedItemsCount = await this.notificationModel
			.query()
			.delete()
			.where({ receiverUserId, type, userId: id });

		return Boolean(deletedItemsCount);
	}

	public async deleteByActionId(
		actionId: number,
		type: ValueOf<typeof NotificationType>,
	): Promise<boolean> {
		const deletedItemsCount = await this.notificationModel
			.query()
			.where({ actionId, type })
			.delete()
			.execute();

		return Boolean(deletedItemsCount);
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
					actionId: notification.actionId,
					createdAt: notification.createdAt,
					id: notification.id,
					message: this.getMessageByType(notification.type, notification.user),
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
				actionId: notification.actionId,
				createdAt: notification.createdAt,
				id: notification.id,
				message: this.getMessageByType(notification.type, notification.user),
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

	public async findAllByReceiverUserId(
		receiverUserId: number,
		search: string,
		type: ValueOf<typeof notificationFilterToType>,
	): Promise<NotificationEntity[]> {
		const userNotifications = await this.notificationModel
			.query()
			.where({ receiverUserId })
			.andWhere((builder) => {
				if (type) {
					void builder.andWhere({ type });
				}
			})
			.andWhere((builder) => {
				void builder
					.whereILike("user:userDetails.firstName", `%${search}%`)
					.orWhereILike("user:userDetails.lastName", `%${search}%`)
					.orWhereRaw("concat(??, ' ', ??) ILIKE ?", [
						"user:userDetails.firstName",
						"user:userDetails.lastName",
						`%${search}%`,
					]);
			})
			.withGraphJoined(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.orderBy("notifications.createdAt", SortOrder.DESC)
			.returning("*")
			.execute();

		return userNotifications.map((notification) => {
			return NotificationEntity.initialize({
				actionId: notification.actionId,
				createdAt: notification.createdAt,
				id: notification.id,
				message: this.getMessageByType(notification.type, notification.user),
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

	public async findByActionId(
		actionId: number,
		type: ValueOf<typeof NotificationType>,
	): Promise<NotificationEntity | null> {
		const notification = await this.notificationModel
			.query()
			.where({ actionId, type })
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.first();

		return notification
			? NotificationEntity.initialize({
					actionId: notification.actionId,
					createdAt: notification.createdAt,
					id: notification.id,
					message: this.getMessageByType(notification.type, notification.user),
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

	public async getUnreadNotificationsCount(userId: number): Promise<number> {
		const { count } = await this.notificationModel
			.query()
			.where({ receiverUserId: userId })
			.andWhere({ status: NotificationStatus.UNREAD })
			.count()
			.first()
			.castTo<{ count: number }>();

		return count;
	}

	public async setReadNotifications(
		notifactionIds: number[],
	): Promise<NotificationEntity[]> {
		const updatedNotifications = await this.notificationModel
			.query()
			.whereIn("id", notifactionIds)
			.update({ status: NotificationStatus.READ })
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.returning("*")
			.execute();

		return updatedNotifications.map((notification) => {
			return NotificationEntity.initialize({
				actionId: notification.actionId,
				createdAt: notification.createdAt,
				id: notification.id,
				message: this.getMessageByType(notification.type, notification.user),
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

	public async update(
		notificationId: number,
		payload: NotificationEntity,
	): Promise<NotificationEntity> {
		const { status } = payload.toUpdateObject();
		const updatedNotification = await this.notificationModel
			.query()
			.patchAndFetchById(notificationId, { status })
			.withGraphFetched(
				`${RelationName.USER}.${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}`,
			)
			.execute();

		return NotificationEntity.initialize({
			actionId: updatedNotification.actionId,
			createdAt: updatedNotification.createdAt,
			id: updatedNotification.id,
			message: this.getMessageByType(
				updatedNotification.type,
				updatedNotification.user,
			),
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
