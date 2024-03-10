import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type GroupResponseDto } from "../libs/types/types.js";
import { getAllGroups } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	groups: GroupResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	groups: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllGroups.fulfilled, (state, action) => {
			state.groups = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllGroups.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllGroups.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "groups",
	reducers: {},
});

export { actions, name, reducer };
