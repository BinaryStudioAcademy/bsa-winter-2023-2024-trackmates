import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type PermissionResponseDto } from "../libs/types/types.js";
import { getAllPermissions } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	permissions: PermissionResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	permissions: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllPermissions.fulfilled, (state, action) => {
			state.permissions = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllPermissions.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllPermissions.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "permissions",
	reducers: {},
});

export { actions, name, reducer };
