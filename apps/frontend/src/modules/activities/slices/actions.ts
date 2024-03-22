import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type AsyncThunkConfig,
	type PaginationRequestDto,
	type PaginationResponseDto,
	type ValueOf,
} from "~/libs/types/types.js";

import { type ActivityType } from "../libs/enums/enums.js";
import { type ActivityResponseDto } from "../libs/types/types.js";
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
	PaginationResponseDto<ActivityResponseDto<ValueOf<typeof ActivityType>>>,
	PaginationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-activities`, (loadActivitiesPayload, { extra }) => {
	const { activitiesApi } = extra;

	return activitiesApi.getAll(loadActivitiesPayload);
});

export { likeActivity, loadActivities };
