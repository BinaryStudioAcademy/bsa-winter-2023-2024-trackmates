import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	SocketEvent,
	SocketNamespace,
	type SocketService,
} from "~/libs/modules/socket/socket.js";
import { type Service, type ValueOf } from "~/libs/types/types.js";

import {
	type NotificationFilter,
	NotificationStatus,
	type NotificationType,
} from "./libs/enums/enums.js";
import { NotificationError } from "./libs/exceptions/exceptions.js";
import { filterQueryParameterToNotificationType } from "./libs/maps/maps.js";
import {
	type AllNotificationsResponseDto,
	type CreateNotificationRequestDto,
	type NotificationResponseDto,
	type UpdateNotificationRequestDto,
} from "./libs/types/types.js";
import { NotificationEntity } from "./notification.entity.js";
import { type NotificationRepository } from "./notification.repository.js";

class NotificationService implements Service {
	private notificationRepository: NotificationRepository;

	private socketService: SocketService;

	public constructor(
		notificationRepository: NotificationRepository,
		socketService: SocketService,
	) {
		this.notificationRepository = notificationRepository;
		this.socketService = socketService;
	}

	public async create(
		payload: CreateNotificationRequestDto,
	): Promise<NotificationResponseDto> {
		const { actionId, receiverUserId, type, userId } = payload;

		const createdNotification = await this.notificationRepository.create(
			NotificationEntity.initializeNew({
				actionId,
				receiverUserId,
				status: NotificationStatus.UNREAD,
				type,
				userId,
			}),
		);

		const notification = createdNotification.toObject();

		this.socketService.emitMessage({
			event: SocketEvent.UPDATE_NOTIFICATION,
			payload: notification,
			receiversIds: [String(notification.userId), String(receiverUserId)],
			targetNamespace: SocketNamespace.NOTIFICATIONS,
		});

		return notification;
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

	public async deleteByActionId(
		actionId: number,
		type: ValueOf<typeof NotificationType>,
	): Promise<boolean> {
		const notification = await this.notificationRepository.findByActionId(
			actionId,
			type,
		);

		if (!notification) {
			throw new NotificationError({
				message: ExceptionMessage.NOTIFICATION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const notificationObject = notification.toObject();

		this.socketService.emitMessage({
			event: SocketEvent.UPDATE_NOTIFICATION,
			payload: notification,
			receiversIds: [String(notificationObject.receiverUserId)],
			targetNamespace: SocketNamespace.NOTIFICATIONS,
		});

		return await this.notificationRepository.deleteByActionId(actionId, type);
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

	public async findAllByReceiverUserId(
		receiverUserId: number,
		notificationFilter: ValueOf<typeof NotificationFilter>,
		search: string,
	): Promise<AllNotificationsResponseDto> {
		const notificationType =
			filterQueryParameterToNotificationType[notificationFilter];

		const userNotifications =
			await this.notificationRepository.findAllByReceiverUserId(
				receiverUserId,
				search,
				notificationType,
			);

		return {
			items: userNotifications.map((notification) => notification.toObject()),
		};
	}

	public async getUnreadNotificationsCount(userId: number): Promise<number> {
		return await this.notificationRepository.getUnreadNotificationsCount(
			userId,
		);
	}

	public async setReadNotifications(
		notifactionIds: number[],
	): Promise<AllNotificationsResponseDto> {
		const readNotifications =
			await this.notificationRepository.setReadNotifications(notifactionIds);

		return {
			items: readNotifications.map((notifcation) => notifcation.toObject()),
		};
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

		const { actionId, receiverUserId, status, type, userId } = payload;

		const updatedNotification = await this.notificationRepository.update(
			notificationId,
			NotificationEntity.initializeNew({
				actionId,
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
