import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type CommentCreateRequestDto,
	type CommentGetAllResponseDto,
	type CommentWithRelationsResponseDto,
} from "~/modules/comments/comments.js";

import { type ActivityGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./activities.slice.js";

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

export { createComment, getAllCommentsToActivity, loadActivities };
