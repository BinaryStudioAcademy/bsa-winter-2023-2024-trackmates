import {
	type Middleware,
	type PayloadAction,
	isAction,
} from "@reduxjs/toolkit";

import { SocketEvent, SocketNamespace } from "~/libs/modules/socket/socket.js";
import { type ExtraArguments } from "~/libs/modules/store/store.js";
import { type AppDispatch, type RootState } from "~/libs/types/types.js";
import {
	type NotificationResponseDto,
	type ReadNotificationsResponseDto,
	actions as userNotificationsActions,
} from "~/modules/user-notifications/user-notifications.js";

const notificationsSocket = ({
	extra: { socket },
}: {
	extra: ExtraArguments;
}): Middleware<unknown, RootState, AppDispatch> => {
	const notificationsSocketInstance = socket.getInstance(
		SocketNamespace.NOTIFICATIONS,
	);

	return ({ dispatch }) => {
		notificationsSocketInstance.on(
			SocketEvent.NOTIFICATIONS_DELETE,
			(notification: NotificationResponseDto) => {
				void dispatch(
					userNotificationsActions.deleteNotification(notification),
				);
			},
		);

		notificationsSocketInstance.on(
			SocketEvent.NOTIFICATIONS_NEW,
			(notification: NotificationResponseDto) => {
				void dispatch(userNotificationsActions.newNotification(notification));
			},
		);

		notificationsSocketInstance.on(
			SocketEvent.NOTIFICATIONS_READ,
			(setReadNotificationsResponse: ReadNotificationsResponseDto) => {
				void dispatch(
					userNotificationsActions.updateReadNotifications(
						setReadNotificationsResponse,
					),
				);
			},
		);

		return (next) => {
			return (action) => {
				if (
					isAction(action) &&
					action.type === userNotificationsActions.joinRoom.type
				) {
					notificationsSocketInstance.emit(
						SocketEvent.NOTIFICATIONS_JOIN_ROOM,
						(action as PayloadAction<string>).payload,
					);
				}

				if (
					isAction(action) &&
					action.type === userNotificationsActions.leaveRoom.type
				) {
					notificationsSocketInstance.emit(
						SocketEvent.NOTIFICATIONS_LEAVE_ROOM,
						(action as PayloadAction<string>).payload,
					);
				}

				return next(action);
			};
		};
	};
};

export { notificationsSocket };
