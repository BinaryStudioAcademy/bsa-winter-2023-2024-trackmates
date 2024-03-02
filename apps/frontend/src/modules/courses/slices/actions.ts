import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type CourseDto,
	type CourseSearchFilterDto,
	type CoursesResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const getAll = createAsyncThunk<
	CoursesResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/get-all`, (filterPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.getAll(filterPayload);
});

const getById = createAsyncThunk<CourseDto, { id: string }, AsyncThunkConfig>(
	`${sliceName}/getById`,
	({ id }, { extra }) => {
		const { courseApi } = extra;

		return courseApi.getById(id);
	},
);

const getRecommended = createAsyncThunk<
	CoursesResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/get-recommended`, (filterPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.getRecommended(filterPayload);
});

export { getAll, getById, getRecommended };
