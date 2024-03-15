import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
	DataStatus,
	NotificationFilter,
	NotificationStatus,
} from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { NEW_NOTIFICATION_COUNT } from "../libs/constants/constants.js";
import { notificationFilterToType } from "../libs/maps/maps.js";
import {
	type NotificationResponseDto,
	type ReadNotificationsResponseDto,
} from "../libs/types/types.js";
import {
	getUnreadNotificationsCount,
	getUserNotifications,
	setReadNotifications,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	notificationType: ValueOf<typeof NotificationFilter>;
	notifications: NotificationResponseDto[];
	unreadNotificationsCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	notificationType: NotificationFilter.ALL,
	notifications: [],
	unreadNotificationsCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getUserNotifications.fulfilled, (state, action) => {
			state.notifications = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getUserNotifications.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getUserNotifications.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(setReadNotifications.fulfilled, (state, action) => {
			state.notifications = state.notifications.map((value) => {
				const updatedNotification = action.payload.items.find(
					(notification) => {
						return notification.id === value.id;
					},
				);

				return updatedNotification ?? value;
			});
			state.unreadNotificationsCount = Number(
				action.payload.unreadNotificationsCount,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(setReadNotifications.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getUnreadNotificationsCount.fulfilled, (state, action) => {
			state.unreadNotificationsCount = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getUnreadNotificationsCount.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-notifications",
	reducers: {
		deleteNotification(state, action: PayloadAction<NotificationResponseDto>) {
			state.notifications = state.notifications.filter((notification) => {
				return notification.id != action.payload.id;
			});

			if (action.payload.status === NotificationStatus.UNREAD) {
				state.unreadNotificationsCount =
					state.unreadNotificationsCount - NEW_NOTIFICATION_COUNT;
			}
		},
		newNotification(state, action: PayloadAction<NotificationResponseDto>) {
			const needUpdateNotifications =
				state.notificationType === NotificationFilter.ALL ||
				notificationFilterToType[state.notificationType] ===
					action.payload.type;

			if (needUpdateNotifications) {
				state.notifications = [action.payload, ...state.notifications];
			}

			state.unreadNotificationsCount =
				state.unreadNotificationsCount + NEW_NOTIFICATION_COUNT;
		},
		setNotificationType(
			state,
			action: PayloadAction<ValueOf<typeof NotificationFilter>>,
		) {
			state.notificationType = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		},
		updateReadNotifications(
			state,
			action: PayloadAction<ReadNotificationsResponseDto>,
		) {
			state.notifications = state.notifications.map((value) => {
				const updatedNotification = action.payload.items.find(
					(notification) => {
						return notification.id === value.id;
					},
				);

				return updatedNotification ?? value;
			});
			state.unreadNotificationsCount = Number(
				action.payload.unreadNotificationsCount,
			);
		},
	},
});

export { actions, name, reducer };
