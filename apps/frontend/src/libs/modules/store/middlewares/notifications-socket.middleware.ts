import {
	type Middleware,
	type PayloadAction,
	isAction,
} from "@reduxjs/toolkit";

import { NotificationFilter } from "~/libs/enums/enums.js";
import { SocketEvent, SocketNamespace } from "~/libs/modules/socket/socket.js";
import { type ExtraArguments } from "~/libs/modules/store/store.js";
import { type AppDispatch, type RootState } from "~/libs/types/types.js";
import { actions as userNotificationsActions } from "~/modules/user-notifications/user-notifications.js";

import { sendNotifications } from "../libs/helpers/helpers.js";

const notificationsSocket = ({
	extra: { socket },
}: {
	extra: ExtraArguments;
}): Middleware<unknown, RootState, AppDispatch> => {
	const notificationsSocketInstance = socket.getInstance(
		SocketNamespace.NOTIFICATIONS,
	);

	return ({ dispatch, getState }) => {
		notificationsSocketInstance.on(SocketEvent.NEW_NOTIFICATION, async () => {
			await dispatch(
				userNotificationsActions.getUserNotifications({
					search: "",
					type: NotificationFilter.ALL,
				}),
			);
			await dispatch(
				userNotificationsActions.checkHasUserUnreadNotifications(),
			);

			const { userNotifications } = getState();

			if (!userNotifications.hasUnreadNotifications) {
				return;
			}

			sendNotifications(userNotifications.notifications);
		});

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
