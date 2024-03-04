import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AllNotificationsResponseDto,
	type ReadNotificationsRequestDto,
} from "../libs/types/types.js";
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

		void dispatch(hasUserUnreadNotifications());

		return readNotifications;
	},
);

export {
	getUserNotifications,
	hasUserUnreadNotifications,
	setReadNotifications,
};
