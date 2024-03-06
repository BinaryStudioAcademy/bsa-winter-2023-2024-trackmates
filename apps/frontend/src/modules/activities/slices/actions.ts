import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig, type ValueOf } from "~/libs/types/types.js";
import {
	type ActivityGetAllResponseDto,
	type ActivityResponseDto,
} from "~/modules/activities/libs/types/types.js";

import { type ActivityType } from "../libs/enums/enums.js";
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

export { likeActivity, loadActivities };
