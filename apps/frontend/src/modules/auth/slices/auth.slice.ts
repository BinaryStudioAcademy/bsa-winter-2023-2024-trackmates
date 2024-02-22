import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import { actions as usersActions } from "~/modules/users/users.js";

import { getAuthenticatedUser, signIn, signUp } from "./actions.js";

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

		builder.addCase(usersActions.updateProfile.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(usersActions.updateProfile.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = { ...state.user, ...action.payload };
		});
		builder.addCase(usersActions.updateProfile.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(usersActions.updateUserAvatar.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(
			usersActions.updateUserAvatar.fulfilled,
			(state, action) => {
				state.dataStatus = DataStatus.FULFILLED;
				state.user = action.payload;
			},
		);
		builder.addCase(usersActions.updateUserAvatar.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
