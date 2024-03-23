import { createAsyncThunk } from "@reduxjs/toolkit";

import { PaginationValue } from "~/libs/enums/enums.js";
import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const remove = createAsyncThunk<
	boolean,
	{ page: number; userId: number },
	AsyncThunkConfig
>(`${sliceName}/remove`, async ({ page, userId }, { dispatch, extra }) => {
	const { notification, userApi } = extra;

	const success = await userApi.remove(userId);

	if (success) {
		notification.success(NotificationMessage.USER_DELETED);
	} else {
		notification.error(NotificationMessage.USER_DELETION_FAILED);
	}

	void dispatch(getAll({ count: PaginationValue.DEFAULT_COUNT, page }));

	return success;
});

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
	PaginationResponseDto<UserAuthResponseDto>,
	PaginationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (query, { extra }) => {
	const { userApi } = extra;

	return await userApi.getAll(query);
});

const getById = createAsyncThunk<UserAuthResponseDto, number, AsyncThunkConfig>(
	`${sliceName}/get-by-id`,
	(userPayload, { extra }) => {
		const { userApi } = extra;

		return userApi.getById(userPayload);
	},
);

export { getAll, getById, remove, updateProfile };
