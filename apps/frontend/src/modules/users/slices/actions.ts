import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import { type UserProfileRequestDto } from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const updateProfile = createAsyncThunk<
	UserAuthResponseDto,
	{ id: number; profilePayload: UserProfileRequestDto },
	AsyncThunkConfig
>(`${sliceName}/profile`, async ({ id, profilePayload }, { extra }) => {
	const { notification, userApi } = extra;

	const user = await userApi.update(id, profilePayload);

	notification.success(NotificationMessage.PROFILE_UPDATED);

	return user;
});

const getById = createAsyncThunk<UserAuthResponseDto, number, AsyncThunkConfig>(
	`${sliceName}/get-by-id`,
	(userPayload, { extra }) => {
		const { userApi } = extra;

		return userApi.getById(userPayload);
	},
);

export { getById, updateProfile };
