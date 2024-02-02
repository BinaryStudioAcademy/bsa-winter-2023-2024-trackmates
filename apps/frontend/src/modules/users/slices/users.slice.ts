import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.ts";
import { type ValueOf } from "~/libs/types/types.ts";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.ts";

import { loadAll } from "./actions.ts";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	users: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
