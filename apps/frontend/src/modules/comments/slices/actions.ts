import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type CommentCreateRequestDto,
	type CommentGetAllResponseDto,
	type CommentWithRelationsResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./comments.slice.js";

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

export { createComment, deleteComment, getAllCommentsToActivity };
