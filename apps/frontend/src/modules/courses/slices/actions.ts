import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type CourseDto,
	type CourseSearchFilterDto,
	type CourseSearchGetAllResponseDto,
	type CourseUpdateRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./courses.slice.js";

const getAllByVendor = createAsyncThunk<
	CourseSearchGetAllResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/get-all-by-vendor`, (filterPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.getAllByVendor(filterPayload);
});

const getById = createAsyncThunk<CourseDto, { id: string }, AsyncThunkConfig>(
	`${sliceName}/getById`,
	({ id }, { extra }) => {
		const { courseApi } = extra;

		return courseApi.getById(id);
	},
);

const getRecommended = createAsyncThunk<
	CourseSearchGetAllResponseDto,
	CourseSearchFilterDto,
	AsyncThunkConfig
>(`${sliceName}/get-recommended`, (filterPayload, { extra }) => {
	const { courseApi } = extra;

	return courseApi.getRecommended(filterPayload);
});

const getAllByFilter = createAsyncThunk<
	CourseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-by-filter`, async (_, { extra }) => {
	const { courseApi } = extra;

	const { courses } = await courseApi.getAllByFilter();

	return courses;
});

const deleteById = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/delete-by-id`,
	async (id, { extra }) => {
		const { courseApi, notification } = extra;

		const { success } = await courseApi.deleteById(String(id));

		if (success) {
			notification.success(NotificationMessage.COURSE_DELETED);
		} else {
			notification.error(NotificationMessage.COURSE_DELETION_FAILED);
		}

		return success;
	},
);

const update = createAsyncThunk<
	CourseDto,
	{ id: number; payload: CourseUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { courseApi, notification } = extra;

	const updatedCourse = await courseApi.update(String(id), payload);

	notification.success(NotificationMessage.COURSE_UPDATED);

	return updatedCourse;
});

export {
	deleteById,
	getAllByFilter,
	getAllByVendor,
	getById,
	getRecommended,
	update,
};
