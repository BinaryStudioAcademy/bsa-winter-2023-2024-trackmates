import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type GetActivitiesResponseDto } from "~/modules/activities/libs/types/types.js";

import { name as sliceName } from "./activities.slice.js";

const loadActivities = createAsyncThunk<
	GetActivitiesResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-activities`, (_payload, { extra }) => {
	const { activitiesApi } = extra;

	return activitiesApi.getActivities();
});

export { loadActivities };
