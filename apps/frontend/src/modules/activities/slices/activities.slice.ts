import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ActivityType } from "../libs/enums/enums.js";
import { type ActivityResponseDto } from "../libs/types/types.js";
import { loadActivities } from "./actions.js";

type State = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	activities: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadActivities.fulfilled, (state, action) => {
			state.activities = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadActivities.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadActivities.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "activities",
	reducers: {},
});

export { actions, name, reducer };
