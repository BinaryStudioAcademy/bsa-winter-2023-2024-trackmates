import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserInfoResponse } from "~/modules/auth/auth.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const signUp = createAsyncThunk<
	UserSignUpResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
	const { authApi } = extra;

	return authApi.signUp(registerPayload);
});

const getAuthenticatedUser = createAsyncThunk<
	UserInfoResponse | null,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, (_payload, { extra }) => {
	const { authApi } = extra;

	return authApi.getAuthenticatedUser();
});

export { getAuthenticatedUser, signUp };
