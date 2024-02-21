import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import { type UserProfileRequestDto } from "~/modules/users/users.js";

import { NotificationMessage } from "../enums/enums.js";

const SLICE_NAME = "users";

const updateProfile = createAsyncThunk<
	UserAuthResponseDto,
	{ id: string; profilePayload: UserProfileRequestDto },
	AsyncThunkConfig
>(`${SLICE_NAME}/profile`, async ({ id, profilePayload }, { extra }) => {
	const { notification, userApi } = extra;

	const user = await userApi.update(id, profilePayload);

	notification.success(NotificationMessage.PROFILE_UPDATED);

	return user;
});

const updateUserAvatar = createAsyncThunk<
	UserAuthResponseDto,
	FormData,
	AsyncThunkConfig
>(`${SLICE_NAME}/update-user-avatar`, async (payload, { extra }) => {
	const { notification, userApi } = extra;

	const user = await userApi.updateAvatar(payload);

	notification.success(NotificationMessage.AVATAR_CHANGED);

	return user;
});

export { updateProfile, updateUserAvatar };
