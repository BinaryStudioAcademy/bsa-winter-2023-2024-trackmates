import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig, type ValueOf } from "~/libs/types/types.js";

import { type NotificationFilter } from "../libs/enums/enums.js";
import {
	type AllNotificationsResponseDto,
	type ReadNotificationsRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-notifications.slice.js";

const getUserNotifications = createAsyncThunk<
	AllNotificationsResponseDto,
	ValueOf<typeof NotificationFilter> | null,
	AsyncThunkConfig
>(`${sliceName}/get-user-notifications`, (type, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUserNotifications(type);
});

const checkHasUserUnreadNotifications = createAsyncThunk<
	boolean,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/check-has-user-unread-notifications`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.checkHasUserUnreadNotifications();
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

		void dispatch(checkHasUserUnreadNotifications());

		return readNotifications;
	},
);

export {
	checkHasUserUnreadNotifications,
	getUserNotifications,
	setReadNotifications,
};
