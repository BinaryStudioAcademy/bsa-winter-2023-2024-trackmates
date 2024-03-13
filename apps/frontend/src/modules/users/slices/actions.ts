import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const remove = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/remove`,
	async (id, { extra }) => {
		const { notification, userApi } = extra;

		await userApi.remove(id);
		notification.success(NotificationMessage.USER_DELETED);

		return id;
	},
);

const updateProfile = createAsyncThunk<
	UserAuthResponseDto,
	{ id: number; profilePayload: UserProfileRequestDto },
	AsyncThunkConfig
>(`${sliceName}/profile`, async ({ id, profilePayload }, { extra }) => {
	const { notification, userApi } = extra;

	const user = await userApi.update(id, profilePayload);

	notification.success(NotificationMessage.PROFILE_CHANGES_SAVED);

	return user;
});

const getAll = createAsyncThunk<
	UserAuthResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (_, { extra }) => {
	const { userApi } = extra;

	const users = await userApi.getAll();

	return users.items;
});

const getById = createAsyncThunk<UserAuthResponseDto, number, AsyncThunkConfig>(
	`${sliceName}/get-by-id`,
	(userPayload, { extra }) => {
		const { userApi } = extra;

		return userApi.getById(userPayload);
	},
);

export { getAll, getById, remove, updateProfile };
