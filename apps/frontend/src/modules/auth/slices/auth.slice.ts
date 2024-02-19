import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import {
	getAuthenticatedUser,
	signIn,
	signUp,
	updateProfile,
	updateUserAvatar,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	user: UserAuthResponseDto | null;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.user = null;
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.user = null;
		});

		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(updateProfile.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = { ...state.user, ...action.payload };
		});
		builder.addCase(updateProfile.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(updateUserAvatar.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateUserAvatar.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(updateUserAvatar.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
