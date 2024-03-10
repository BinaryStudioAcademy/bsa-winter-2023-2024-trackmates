import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../libs/types/types.js";
import { getAll, getById } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	profileUser: UserAuthResponseDto | null;
	users: UserAuthResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	profileUser: null,
	users: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

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
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
