import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import { getAuthenticatedUser, signUp } from "./actions.js";

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
		});
		builder.addMatcher(
			isAnyOf(signUp.fulfilled, getAuthenticatedUser.fulfilled),
			(state) => {
				state.dataStatus = DataStatus.FULFILLED;
			},
		);
		builder.addMatcher(
			isAnyOf(signUp.pending, getAuthenticatedUser.pending),
			(state) => {
				state.dataStatus = DataStatus.PENDING;
			},
		);
		builder.addMatcher(
			isAnyOf(signUp.rejected, getAuthenticatedUser.rejected),
			(state) => {
				state.dataStatus = DataStatus.REJECTED;
			},
		);
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
