import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../libs/types/types.js";
import { getById, remove } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	profileUser: UserAuthResponseDto | null;
	userToDataStatus: Record<number, ValueOf<typeof DataStatus>>;
	users: UserAuthResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	profileUser: null,
	userToDataStatus: {},
	users: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.fulfilled, (state, action) => {
			state.profileUser = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(remove.fulfilled, (state, { payload: userId }) => {
			state.users = state.users.filter(({ id }) => id !== userId);
			state.userToDataStatus[userId] = DataStatus.FULFILLED;
		});
		builder.addCase(remove.pending, (state, { meta: { arg: userId } }) => {
			state.userToDataStatus[userId] = DataStatus.PENDING;
		});
		builder.addCase(remove.rejected, (state, { meta: { arg: userId } }) => {
			state.userToDataStatus[userId] = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
