import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/service.type.js";

import { NotificationMessage, NotificationStatus } from "./libs/enums/enums.js";
import { NotificationError } from "./libs/exceptions/exceptions.js";
import {
	type AllNotificationsResponseDto,
	type CreateNotificationRequestDto,
	type NotificationResponseDto,
	type NotificationType,
	type UpdateNotificationRequestDto,
} from "./libs/types/types.js";
import { NotificationEntity } from "./notification.entity.js";
import { type NotificationRepository } from "./notification.repository.js";

class NotificationService implements Service {
	private notificationRepository: NotificationRepository;

	public constructor(notificationRepository: NotificationRepository) {
		this.notificationRepository = notificationRepository;
	}

	private getMessageByType(type: NotificationType): string {
		const notificationTypeToMessageMap: Record<NotificationType, string> = {
			new_follower: NotificationMessage.NEW_FOLLOWER_MESSAGE,
		};

		return notificationTypeToMessageMap[type];
	}

	public async create(
		payload: CreateNotificationRequestDto,
	): Promise<NotificationResponseDto> {
		const { receiverUserId, type, userId } = payload;

		const message = this.getMessageByType(type);

		const notification = await this.notificationRepository.create(
			NotificationEntity.initializeNew({
				message,
				receiverUserId,
				status: NotificationStatus.UNREAD,
				type,
				userId,
			}),
		);

		return notification.toObject();
	}

	public async delete(notificationId: number): Promise<boolean> {
		const notification = await this.notificationRepository.find(notificationId);

		if (!notification) {
			throw new NotificationError({
				message: ExceptionMessage.NOTIFICATION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.notificationRepository.delete(notificationId);
	}

	public async find(notificationId: number): Promise<NotificationResponseDto> {
		const notification = await this.notificationRepository.find(notificationId);

		if (!notification) {
			throw new NotificationError({
				message: ExceptionMessage.NOTIFICATION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return notification.toObject();
	}

	public async findAll(): Promise<AllNotificationsResponseDto> {
		const notifications = await this.notificationRepository.findAll();

		return {
			items: notifications.map((notification) => notification.toObject()),
		};
	}

	public async findAllByUserId(
		userId: number,
	): Promise<AllNotificationsResponseDto> {
		const userNotifications =
			await this.notificationRepository.findAllByUserId(userId);

		return {
			items: userNotifications.map((notification) => notification.toObject()),
		};
	}

	public async hasUserUnreadNotifications(userId: number): Promise<boolean> {
		return await this.notificationRepository.hasUserUnreadNotifications(userId);
	}

	public async update(
		notificationId: number,
		payload: UpdateNotificationRequestDto,
	): Promise<NotificationResponseDto> {
		const notification = await this.notificationRepository.find(notificationId);

		if (!notification) {
			throw new NotificationError({
				message: ExceptionMessage.NOTIFICATION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { receiverUserId, status, type, userId } = payload;

		const message = this.getMessageByType(type);

		const updatedNotification = await this.notificationRepository.update(
			notificationId,
			NotificationEntity.initializeNew({
				message,
				receiverUserId,
				status,
				type,
				userId,
			}),
		);

		return updatedNotification.toObject();
	}
}

export { NotificationService };
