import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import { type UserSignUpRequestDto } from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const signUp = createAsyncThunk<
	UserAuthResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signUp(registerPayload);

	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const getAuthenticatedUser = createAsyncThunk<
	UserAuthResponseDto | null,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, (_payload, { extra }) => {
	const { authApi, storage } = extra;

	const hasToken = Boolean(storage.get(StorageKey.TOKEN));

	if (!hasToken) {
		return null;
	}

	return authApi.getAuthenticatedUser();
});

export { getAuthenticatedUser, signUp };
