import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CommentWithRelationsResponseDto } from "~/modules/comments/comments.js";

import { type ActivityType } from "../libs/enums/enums.js";
import { type ActivityResponseDto } from "../libs/types/types.js";
import {
	createComment,
	deleteComment,
	getAllCommentsToActivity,
	likeActivity,
	loadActivities,
} from "./actions.js";

type State = {
	activities: ActivityResponseDto<ValueOf<typeof ActivityType>>[];
	commentsByActivity: Record<number, CommentWithRelationsResponseDto[]>;
	commentsDataStatuses: Record<number, ValueOf<typeof DataStatus>>;
	dataStatus: ValueOf<typeof DataStatus>;
	likeDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	activities: [],
	commentsByActivity: {},
	commentsDataStatuses: {},
	dataStatus: DataStatus.IDLE,
	likeDataStatus: DataStatus.IDLE,
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
			const activityId = action.meta.arg;

			state.activities = state.activities.map((activity) => {
				return activity.id === activityId
					? { ...activity, commentCount: action.payload.items.length }
					: activity;
			});

			state.commentsByActivity[activityId] = action.payload.items;
			state.commentsDataStatuses[activityId] = DataStatus.FULFILLED;
		});
		builder.addCase(getAllCommentsToActivity.pending, (state, action) => {
			const activityId = action.meta.arg;
			state.commentsDataStatuses[activityId] = DataStatus.PENDING;
		});
		builder.addCase(getAllCommentsToActivity.rejected, (state, action) => {
			const activityId = action.meta.arg;
			state.commentsDataStatuses[activityId] = DataStatus.REJECTED;
		});
		builder.addCase(createComment.fulfilled, (state, action) => {
			const { activityId } = action.payload;
			state.activities = state.activities.map((activity) => {
				return activity.id === activityId
					? { ...activity, commentCount: ++activity.commentCount }
					: activity;
			});

			const previousComments = state.commentsByActivity[activityId] ?? [];
			state.commentsByActivity[activityId] = [
				action.payload,
				...previousComments,
			];
			state.commentsDataStatuses[activityId] = DataStatus.FULFILLED;
		});
		builder.addCase(createComment.pending, (state, action) => {
			const { activityId } = action.meta.arg;
			state.commentsDataStatuses[activityId] = DataStatus.PENDING;
		});
		builder.addCase(createComment.rejected, (state, action) => {
			const { activityId } = action.meta.arg;
			state.commentsDataStatuses[activityId] = DataStatus.REJECTED;
		});
		builder.addCase(deleteComment.fulfilled, (state, action) => {
			const isDeletionSuccess = action.payload;
			const { activityId, commentId } = action.meta.arg;

			if (isDeletionSuccess) {
				state.activities = state.activities.map((activity) => {
					return activity.id === activityId
						? { ...activity, commentCount: --activity.commentCount }
						: activity;
				});

				const comments = state.commentsByActivity[activityId] ?? [];
				state.commentsByActivity[activityId] = comments.filter(
					(comment) => comment.id !== commentId,
				);
			}

			state.commentsDataStatuses[activityId] = DataStatus.FULFILLED;
		});
		builder.addCase(deleteComment.pending, (state, action) => {
			const { activityId } = action.meta.arg;
			state.commentsDataStatuses[activityId] = DataStatus.PENDING;
		});
		builder.addCase(deleteComment.rejected, (state, action) => {
			const { activityId } = action.meta.arg;
			state.commentsDataStatuses[activityId] = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "activities",
	reducers: {},
});

export { actions, name, reducer };
