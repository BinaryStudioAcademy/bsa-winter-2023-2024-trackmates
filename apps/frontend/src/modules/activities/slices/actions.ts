import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig, type ValueOf } from "~/libs/types/types.js";
import {
	type CommentCreateRequestDto,
	type CommentGetAllResponseDto,
	type CommentWithRelationsResponseDto,
} from "~/modules/comments/comments.js";

import { type ActivityType } from "../libs/enums/enums.js";
import {
	type ActivityGetAllResponseDto,
	type ActivityResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./activities.slice.js";

const likeActivity = createAsyncThunk<
	ActivityResponseDto<ValueOf<typeof ActivityType>>,
	number,
	AsyncThunkConfig
>(`${sliceName}/like-activity`, (activityId, { extra }) => {
	const { activitiesApi } = extra;

	return activitiesApi.likeActivity({ activityId });
});

const loadActivities = createAsyncThunk<
	ActivityGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-activities`, (_payload, { extra }) => {
	const { activitiesApi } = extra;

	return activitiesApi.getActivities();
});

const getAllCommentsToActivity = createAsyncThunk<
	CommentGetAllResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-all-comments-to-activity`, (activityId, { extra }) => {
	const { commentApi } = extra;

	return commentApi.getAllByActivityId({ activityId });
});

const createComment = createAsyncThunk<
	CommentWithRelationsResponseDto,
	CommentCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-comment`, (payload, { extra }) => {
	const { commentApi } = extra;

	return commentApi.create(payload);
});

const deleteComment = createAsyncThunk<
	boolean,
	{ activityId: number; commentId: number },
	AsyncThunkConfig
>(`${sliceName}/delete-comment`, (payload, { extra }) => {
	const { commentApi } = extra;

	return commentApi.delete(payload.commentId);
});

export {
	createComment,
	deleteComment,
	getAllCommentsToActivity,
	likeActivity,
	loadActivities,
};
