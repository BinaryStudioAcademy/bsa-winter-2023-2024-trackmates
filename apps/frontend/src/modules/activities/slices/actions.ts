import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type ActivityGetActivitiesResponseDto } from "~/modules/activities/libs/types/types.js";

import { name as sliceName } from "./activities.slice.js";

const loadActivities = createAsyncThunk<
	ActivityGetActivitiesResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-activities`, (_payload, { extra }) => {
	const { activitiesApi } = extra;

	return activitiesApi.getActivities();
});

export { loadActivities };
