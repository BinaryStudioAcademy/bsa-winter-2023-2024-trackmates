import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AddCourseRequestDto,
	type CourseDto,
	type CourseSearchRequestDto,
	type CourseSearchResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const add = createAsyncThunk<CourseDto, AddCourseRequestDto, AsyncThunkConfig>(
	`${sliceName}/add`,
	(requestPayload, { extra }) => {
		const { courseApi } = extra;

		return courseApi.add(requestPayload);
	},
);

const loadAll = createAsyncThunk<CourseDto[], undefined, AsyncThunkConfig>(
	`${sliceName}/load-all`,
	(_, { extra }) => {
		const { courseApi } = extra;

		return courseApi.getAll();
	},
);

const search = createAsyncThunk<
	CourseSearchResponseDto,
	CourseSearchRequestDto,
	AsyncThunkConfig
>(`${sliceName}/search`, (requestPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.search(requestPayload);
});

export { add, loadAll, search };
