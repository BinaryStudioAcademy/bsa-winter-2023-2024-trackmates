import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { type NotificationFilter } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig, type ValueOf } from "~/libs/types/types.js";

import {
	type AllNotificationsResponseDto,
	type ReadNotificationsRequestDto,
	type ReadNotificationsResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-notifications.slice.js";

const getUserNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	{
		search: string | undefined;
		type: ValueOf<typeof NotificationFilter> | null;
	},
	AsyncThunkConfig
>(`${sliceName}/get-user-notifications`, ({ search, type }, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUserNotifications({ search, type });
});

const getUnreadNotificationsCount = createAsyncThunk<
	number,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-unread-notifications-count`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUnreadNotificationsCount();
});

const setReadNotifications = createAsyncThunk<
	ReadNotificationsResponseDto,
	ReadNotificationsRequestDto,
	AsyncThunkConfig
>(`${sliceName}/set-read-notifications`, async (payload, { extra }) => {
	const { userNotificationsApi } = extra;

	return await userNotificationsApi.setReadNotifications(payload);
});

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
	getUnreadNotificationsCount,
	getUserNotifications,
	joinRoom,
	leaveRoom,
	setReadNotifications,
};
