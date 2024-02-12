import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

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

const signIn = createAsyncThunk<
	UserSignInResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
	const { authApi, storage } = extra;
	const result = await authApi.signIn(loginPayload);
	await storage.set(StorageKey.TOKEN, result.token);
	return result;
});

const signUp = createAsyncThunk<
	UserSignUpResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
	const { authApi } = extra;
	return authApi.signUp(registerPayload);
});

export { getAuthenticatedUser, signIn, signUp };
