import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type CourseSearchFilterDto,
	type CourseSearchResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const search = createAsyncThunk<
	CourseSearchResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/search`, (requestPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.search(requestPayload);
});

export { search };
