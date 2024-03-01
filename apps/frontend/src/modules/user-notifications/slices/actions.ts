import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type AllNotificationsResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./user-notifications.slice.js";

const getUserNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-user-notifications`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUserNotifications();
});

const hasUserUnreadNotifications = createAsyncThunk<
	boolean,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/has-user-unread-notifications`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.hasUserUnreadNotifications();
});

export { getUserNotifications, hasUserUnreadNotifications };
