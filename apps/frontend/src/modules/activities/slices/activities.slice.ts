import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CommentWithRelationsResponseDto } from "~/modules/comments/comments.js";

import { type ActivityType } from "../libs/enums/enums.js";
import { type ActivityResponseDto } from "../libs/types/types.js";
import {
	createComment,
	getAllCommentsToActivity,
	loadActivities,
} from "./actions.js";

type State = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
	activityComments: CommentWithRelationsResponseDto[];
	createCommentDataStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	getActivityCommentsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	activities: [],
	activityComments: [],
	createCommentDataStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	getActivityCommentsDataStatus: DataStatus.IDLE,
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
		builder.addCase(getAllCommentsToActivity.fulfilled, (state, action) => {
			state.activityComments = action.payload.items;
			state.getActivityCommentsDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllCommentsToActivity.pending, (state) => {
			state.getActivityCommentsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllCommentsToActivity.rejected, (state) => {
			state.getActivityCommentsDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(createComment.fulfilled, (state, action) => {
			state.activityComments = [action.payload, ...state.activityComments];
			state.activities = state.activities.map((activity) => {
				return activity.id === action.payload.activityId
					? { ...activity, commentCount: ++activity.commentCount }
					: activity;
			});
			state.createCommentDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createComment.pending, (state) => {
			state.createCommentDataStatus = DataStatus.PENDING;
		});
		builder.addCase(createComment.rejected, (state) => {
			state.createCommentDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "activities",
	reducers: {},
});

export { actions, name, reducer };
