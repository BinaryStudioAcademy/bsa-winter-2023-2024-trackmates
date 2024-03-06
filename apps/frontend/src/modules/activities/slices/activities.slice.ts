import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ActivityType } from "../libs/enums/enums.js";
import { type ActivityResponseDto } from "../libs/types/types.js";
import { likeActivity, loadActivities } from "./actions.js";

type State = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
	dataStatus: ValueOf<typeof DataStatus>;
	likeDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	activities: [],
	dataStatus: DataStatus.IDLE,
	likeDataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(likeActivity.fulfilled, (state, action) => {
			const updatedActivity = action.payload;
			const index = state.activities.findIndex(
				(activity) => activity.id === updatedActivity.id,
			);
			state.activities[index] = updatedActivity;
			state.likeDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(likeActivity.pending, (state) => {
			state.likeDataStatus = DataStatus.PENDING;
		});
		builder.addCase(likeActivity.rejected, (state) => {
			state.likeDataStatus = DataStatus.REJECTED;
		});

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
