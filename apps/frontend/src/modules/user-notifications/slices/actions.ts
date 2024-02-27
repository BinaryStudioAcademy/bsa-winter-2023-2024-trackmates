import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type NotificationResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./user-notifications.slice.js";

type some = {
	items: NotificationResponseDto[];
};

const getUserNotifications = createAsyncThunk<
	some,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-user-notifications`, (_, { extra }) => {
	const { userNotificationsApi } = extra;

	return userNotificationsApi.getUserNotifications();
});

export { getUserNotifications };
