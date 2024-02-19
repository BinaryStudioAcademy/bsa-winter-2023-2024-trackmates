import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AddCourseRequestDto,
	type CourseDto,
	type CourseSearchFilterDto,
	type CourseSearchResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const add = createAsyncThunk<CourseDto, AddCourseRequestDto, AsyncThunkConfig>(
	`${sliceName}/add`,
	async (requestPayload, { extra }) => {
		const { courseApi, notification } = extra;

		const newCourse = await courseApi.add(requestPayload);
		notification.success(NotificationMessage.COURSE_ADDED);

		return newCourse;
	},
);

const loadAll = createAsyncThunk<
	CourseSearchResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (userId, { extra }) => {
	const { courseApi } = extra;

	return courseApi.getAll(userId);
});

const search = createAsyncThunk<
	CourseSearchResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/search`, (requestPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.search(requestPayload);
});

export { add, loadAll, search };
