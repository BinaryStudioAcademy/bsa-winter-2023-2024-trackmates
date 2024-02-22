import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { NotificationMessage } from "../libs/enums/enums.js";
import { type UserFileResponseDto } from "../libs/types/type.js";
import { name as sliceName } from "./files.slice.js";

const updateUserAvatar = createAsyncThunk<
	UserFileResponseDto,
	FormData,
	AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
	const { filesApi, notification } = extra;

	const user = await filesApi.updateAvatar(payload);

	notification.success(NotificationMessage.AVATAR_CHANGED);

	return user;
});

export { updateUserAvatar };
