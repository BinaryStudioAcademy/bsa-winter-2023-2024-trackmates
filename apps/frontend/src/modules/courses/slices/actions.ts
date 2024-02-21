import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type CourseSearchFilterDto,
	type CoursesResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const search = createAsyncThunk<
	CoursesResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/search`, (requestPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.getAll(requestPayload);
});

export { search };
