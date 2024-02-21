import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type CourseResponseDto,
	type CourseSearchFilterDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const search = createAsyncThunk<
	CourseResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/search`, (requestPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.search(requestPayload);
});

export { search };
