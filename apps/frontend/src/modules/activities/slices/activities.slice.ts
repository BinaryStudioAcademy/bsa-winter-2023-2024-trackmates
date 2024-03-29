import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as commentActions } from "~/modules/comments/comments.js";

import { type ActivityType } from "../libs/enums/enums.js";
import { type ActivityResponseDto } from "../libs/types/types.js";
import { likeActivity, loadActivities } from "./actions.js";

type State = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
	dataStatus: ValueOf<typeof DataStatus>;
	likeDataStatus: ValueOf<typeof DataStatus>;
	totalCount: number;
};

const initialState: State = {
	activities: [],
	dataStatus: DataStatus.IDLE,
	likeDataStatus: DataStatus.IDLE,
	totalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(likeActivity.fulfilled, (state, action) => {
			state.activities = state.activities.map((activity) => {
				return activity.id === action.payload.id ? action.payload : activity;
			});
			state.likeDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(likeActivity.pending, (state) => {
			state.likeDataStatus = DataStatus.PENDING;
		});
		builder.addCase(likeActivity.rejected, (state) => {
			state.likeDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadActivities.fulfilled, (state, action) => {
			state.activities = [
				...state.activities,
				...action.payload.items.filter((newItem) => {
					return !state.activities.some(
						(existingItem) => existingItem.id === newItem.id,
					);
				}),
			];
			state.totalCount = action.payload.total;

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadActivities.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadActivities.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(
			commentActions.getAllCommentsToActivity.fulfilled,
			(state, action) => {
				const activityId = action.meta.arg;

				state.activities = state.activities.map((activity) => {
					return activity.id === activityId
						? { ...activity, commentCount: action.payload.items.length }
						: activity;
				});
			},
		);
		builder.addCase(commentActions.createComment.fulfilled, (state, action) => {
			const { activityId } = action.payload;
			state.activities = state.activities.map((activity) => {
				return activity.id === activityId
					? { ...activity, commentCount: ++activity.commentCount }
					: activity;
			});
		});
		builder.addCase(commentActions.deleteComment.fulfilled, (state, action) => {
			const isDeletionSuccess = action.payload;
			const { activityId } = action.meta.arg;

			if (isDeletionSuccess) {
				state.activities = state.activities.map((activity) => {
					return activity.id === activityId
						? { ...activity, commentCount: --activity.commentCount }
						: activity;
				});
			}
		});
	},
	initialState,
	name: "activities",
	reducers: {
		reset() {
			return initialState;
		},
	},
});

export { actions, name, reducer };
