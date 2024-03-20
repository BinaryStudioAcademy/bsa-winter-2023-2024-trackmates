import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CommentWithRelationsResponseDto } from "../libs/types/types.js";
import {
	createComment,
	deleteComment,
	getAllCommentsToActivity,
} from "./actions.js";

type State = {
	commentsByActivity: Record<number, CommentWithRelationsResponseDto[]>;
	commentsDataStatuses: Record<number, ValueOf<typeof DataStatus>>;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	commentsByActivity: {},
	commentsDataStatuses: {},
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllCommentsToActivity.fulfilled, (state, action) => {
			const activityId = action.meta.arg;

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
	name: "comments",
	reducers: {},
});

export { actions, name, reducer };
