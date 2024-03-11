import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AllNotificationsResponseDto,
	type ReadNotificationsRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-notifications.slice.js";

const getUserNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	string | undefined,
	AsyncThunkConfig
>(`${sliceName}/get-user-notifications`, (search = "", { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUserNotifications(search);
});

const getUnreadNotificationCounter = createAsyncThunk<
	number,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-unread-notification-counter`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUnreadNotificationCounter();
});

const setReadNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	ReadNotificationsRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/set-read-notifications`,
	async (payload, { dispatch, extra }) => {
		const { userNotificationsApi } = extra;

		const readNotifications =
			await userNotificationsApi.setReadNotifications(payload);

		void dispatch(getUnreadNotificationCounter());

		return readNotifications;
	},
);

const joinRoom = createAction(`${sliceName}/join-room`, (userId: string) => {
	return {
		payload: userId,
	};
});

const leaveRoom = createAction(`${sliceName}/leave-room`, (userId: string) => {
	return {
		payload: userId,
	};
});

export {
	getUnreadNotificationCounter,
	getUserNotifications,
	joinRoom,
	leaveRoom,
	setReadNotifications,
};
