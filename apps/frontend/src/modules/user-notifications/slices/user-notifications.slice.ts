import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type NotificationResponseDto } from "../libs/types/types.js";
import { getUserNotifications } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	hasUnread: boolean;
	notifications: NotificationResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	hasUnread: false,
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
	},
	initialState,
	name: "user-notifactions",
	reducers: {},
});

export { actions, name, reducer };
