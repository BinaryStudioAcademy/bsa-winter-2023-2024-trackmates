import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type NotificationResponseDto } from "../libs/types/types.js";
import {
	checkHasUserUnreadNotifications,
	getUserNotifications,
	setReadNotifications,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	hasUnreadNotifications: boolean;
	notifications: NotificationResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	hasUnreadNotifications: false,
	notifications: [],
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
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(setReadNotifications.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(
			checkHasUserUnreadNotifications.fulfilled,
			(state, action) => {
				state.hasUnreadNotifications = action.payload;
			},
		);
		builder.addCase(checkHasUserUnreadNotifications.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-notifactions",
	reducers: {},
});

export { actions, name, reducer };
