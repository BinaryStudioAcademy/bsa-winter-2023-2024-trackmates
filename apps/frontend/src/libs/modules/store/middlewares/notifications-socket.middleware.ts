import {
	type Middleware,
	type PayloadAction,
	isAction,
} from "@reduxjs/toolkit";

import { SocketEvent, SocketNamespace } from "~/libs/modules/socket/socket.js";
import { type ExtraArguments } from "~/libs/modules/store/store.js";
import { type AppDispatch, type RootState } from "~/libs/types/types.js";
import { actions as userNotificationsActions } from "~/modules/user-notifications/user-notifications.js";

const notificationsSocket = ({
	extra: { socket },
}: {
	extra: ExtraArguments;
}): Middleware<unknown, RootState, AppDispatch> => {
	const notificationsSocketInstance = socket.getInstance(
		SocketNamespace.NOTIFICATION,
	);

	return ({ dispatch }) => {
		notificationsSocketInstance.on(
			SocketEvent.NOTIFICATION_NEW_FOLLOWER,
			() => {
				void dispatch(userNotificationsActions.getUserNotifications());
				void dispatch(
					userNotificationsActions.checkHasUserUnreadNotifications(),
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
						SocketEvent.NOTIFICATION_JOIN_ROOM,
						(action as PayloadAction<string>).payload,
					);
				}

				if (
					isAction(action) &&
					action.type === userNotificationsActions.leaveRoom.type
				) {
					notificationsSocketInstance.emit(
						SocketEvent.NOTIFICATION_LEAVE_ROOM,
						(action as PayloadAction<string>).payload,
					);
				}

				return next(action);
			};
		};
	};
};

export { notificationsSocket };
