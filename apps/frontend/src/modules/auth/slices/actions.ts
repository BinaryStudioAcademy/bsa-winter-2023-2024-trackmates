import { createAsyncThunk } from "@reduxjs/toolkit";

import { HTTPCode } from "~/libs/modules/http/http.js";
import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type AuthForgotPasswordRequestDto,
	type AuthUpdatePasswordRequestDto,
	type UserAuthResponseDto,
} from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { AuthErrorMessage } from "../libs/enums/enums.js";
import { AuthError } from "./../libs/exceptions/exceptions.js";
import { name as sliceName } from "./auth.slice.js";

const forgotPassword = createAsyncThunk<
	boolean,
	AuthForgotPasswordRequestDto,
	AsyncThunkConfig
>(`${sliceName}/forgot-password`, async (payload, { extra }) => {
	const { authApi } = extra;

	return await authApi.forgotPassword(payload);
});

const getAuthenticatedUser = createAsyncThunk<
	UserAuthResponseDto | null,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_payload, { extra }) => {
	const { authApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);
	const hasToken = Boolean(token);

	if (!hasToken) {
		return null;
	}

	return await authApi.getAuthenticatedUser();
});

const updatePassword = createAsyncThunk<
	UserAuthResponseDto,
	Omit<AuthUpdatePasswordRequestDto, "token">,
	AsyncThunkConfig
>(`${sliceName}/update-password`, async (payload, { extra }) => {
	const { authApi, notification, storage } = extra;

	const queryToken = new URL(window.location.toString()).searchParams.get(
		"token",
	);

	if (!queryToken) {
		throw new AuthError({
			message: AuthErrorMessage.WRONG_UPDATE_PASSWORD_LINK,
			status: HTTPCode.BAD_REQUEST,
		});
	}

	const { token, user } = await authApi.updatePassword({
		...payload,
		token: queryToken,
	});

	notification.success(NotificationMessage.PASSWORD_WAS_UPDATED);

	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const signIn = createAsyncThunk<
	UserAuthResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signIn(loginPayload);

	await storage.set(StorageKey.TOKEN, token);

	return user;
});

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

const logOut = createAsyncThunk<null, undefined, AsyncThunkConfig>(
	`${sliceName}/log-out`,
	async (_, { extra }) => {
		const { storage } = extra;

		await storage.drop(StorageKey.TOKEN);

		return null;
	},
);

export {
	forgotPassword,
	getAuthenticatedUser,
	logOut,
	signIn,
	signUp,
	updatePassword,
};
