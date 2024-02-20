import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import { updateProfile, updateUserAvatar } from "./actions.js";

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
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
