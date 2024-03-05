import { createAsyncThunk } from "@reduxjs/toolkit";

import { PaginationValue } from "~/libs/enums/enums.js";
import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type PaginationResponseDto,
} from "~/libs/types/types.js";

import {
	type AddCourseRequestDto,
	type CourseDto,
	type CourseGetAllByUserRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-courses.slice.js";

const add = createAsyncThunk<CourseDto, AddCourseRequestDto, AsyncThunkConfig>(
	`${sliceName}/add`,
	async (requestPayload, { extra }) => {
		const { notification, userCourseApi } = extra;

		const newCourse = await userCourseApi.add(requestPayload);
		notification.success(NotificationMessage.COURSE_ADDED);

		return newCourse;
	},
);

const loadMyCourses = createAsyncThunk<
	PaginationResponseDto<CourseDto>,
	CourseGetAllByUserRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (loadMyCoursesPayload, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId(loadMyCoursesPayload);
});

const loadUserCourses = createAsyncThunk<
	PaginationResponseDto<CourseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/load-user-courses`, (userId, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId({
		count: PaginationValue.DEFAULT_COUNT,
		page: PaginationValue.DEFAULT_PAGE,
		search: "",
		userId,
	});
});

export { add, loadMyCourses, loadUserCourses };
