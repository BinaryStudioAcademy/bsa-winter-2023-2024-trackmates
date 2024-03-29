import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type FileUploadResponseDto } from "../libs/types/type.js";
import { name as sliceName } from "./files.slice.js";

const updateUserAvatar = createAsyncThunk<
	FileUploadResponseDto,
	FormData,
	AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
	const { filesApi, notification } = extra;

	const user = await filesApi.updateAvatar(payload);

	notification.success(NotificationMessage.PROFILE_CHANGES_SAVED);

	return user;
});

export { updateUserAvatar };
